import { UserManager } from "oidc-client";

const silentSigninHandler = (function ()
{
    console.log("silentSigninHandler executed");
    return new UserManager({}).signinSilentCallback();
})();

export default silentSigninHandler;