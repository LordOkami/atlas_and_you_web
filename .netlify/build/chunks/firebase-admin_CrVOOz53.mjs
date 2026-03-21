import 'firebase-admin/app';
import 'firebase-admin/firestore';
import 'firebase-admin/auth';

const IS_MOCK = true;
function getDb() {
  return null;
}

export { IS_MOCK as I, getDb as g };
