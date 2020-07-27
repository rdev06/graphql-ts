import { AuthChecker } from 'type-graphql';
import { ctx } from './types';

const AuthGuard: AuthChecker<ctx> = (
  { root, args, context: { req }, info },
  roles
) => {
  //   console.log('root=====>' + root);
  console.log('args=====>' + JSON.stringify(args));
  console.log('context=====>' + JSON.stringify(req.headers.token));
  //   console.log('info=====>' + JSON.stringify(info));
  console.log('roles=====>' + roles);

  return true; // or false if access is denied
};

export default AuthGuard;
