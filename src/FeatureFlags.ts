import getBuildType from "./util/BuildType";

export const isAuthEnabled = () => false;
export const isGroupPlayEnabled = () => true;
export const isDebugEnabled = () => {
    return getBuildType() !== 'Production';
};
