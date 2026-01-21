/**
 * Google's Polyline Algorithm implementation.
 * Compresses an array of coordinates into a compact string.
 */

export const encodePolyline = (coordinates) => {
    if (!coordinates || coordinates.length === 0) return '';

    const encode = (num) => {
        let v = num < 0 ? ~(num << 1) : num << 1;
        let s = '';
        while (v >= 0x20) {
            s += String.fromCharCode((0x20 | (v & 0x1f)) + 63);
            v >>= 5;
        }
        s += String.fromCharCode(v + 63);
        return s;
    };

    let lastLat = 0;
    let lastLng = 0;
    let result = '';

    for (const point of coordinates) {
        const lat = Math.round((point.latitude || point.lat) * 1e5);
        const lng = Math.round((point.longitude || point.lng) * 1e5);

        result += encode(lat - lastLat);
        result += encode(lng - lastLng);

        lastLat = lat;
        lastLng = lng;
    }

    return result;
};

export const decodePolyline = (encoded) => {
    if (!encoded) return [];

    let index = 0;
    let lat = 0;
    let lng = 0;
    const coordinates = [];

    while (index < encoded.length) {
        let b;
        let shift = 0;
        let result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
        lng += dlng;

        coordinates.push({
            latitude: lat / 1e5,
            longitude: lng / 1e5,
        });
    }

    return coordinates;
};

/**
 * Douglas-Peucker algorithm for path simplification.
 * Reduces the number of points in a curve while preserving its shape.
 */
export const simplifyPath = (points, tolerance = 0.00001) => {
    if (points.length <= 2) return points;

    const getDistanceSq = (p, p1, p2) => {
        let x = p1.latitude, y = p1.longitude;
        let dx = p2.latitude - x, dy = p2.longitude - y;

        if (dx !== 0 || dy !== 0) {
            const t = ((p.latitude - x) * dx + (p.longitude - y) * dy) / (dx * dx + dy * dy);
            if (t > 1) {
                x = p2.latitude;
                y = p2.longitude;
            } else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }

        dx = p.latitude - x;
        dy = p.longitude - y;
        return dx * dx + dy * dy;
    };

    const simplifyStep = (pts, first, last, sqTolerance, simplified) => {
        let maxSqDist = sqTolerance;
        let index;

        for (let i = first + 1; i < last; i++) {
            const sqDist = getDistanceSq(pts[i], pts[first], pts[last]);
            if (sqDist > maxSqDist) {
                index = i;
                maxSqDist = sqDist;
            }
        }

        if (maxSqDist > sqTolerance) {
            if (index - first > 1) simplifyStep(pts, first, index, sqTolerance, simplified);
            simplified.push(pts[index]);
            if (last - index > 1) simplifyStep(pts, index, last, sqTolerance, simplified);
        }
    };

    const simplified = [points[0]];
    simplifyStep(points, 0, points.length - 1, tolerance * tolerance, simplified);
    simplified.push(points[points.length - 1]);

    return simplified;
};
