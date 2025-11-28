import { Redirect } from 'expo-router';
import { getAuth } from '../app/auth'; // senin auth boolean kontrolün

export default function RootIndex() {
  const logged = getAuth();

  if (logged) {
    return <Redirect href="/private" />;
  } else {
    return <Redirect href="/public" />;
  }
}
