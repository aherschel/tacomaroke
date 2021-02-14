type BuildType = 'Development' | 'Production'

const getBuildType = (): BuildType => {
    if (process.env.NODE_ENV === 'production') {
        return 'Production'
    }
    return 'Development'
};

export default getBuildType;
