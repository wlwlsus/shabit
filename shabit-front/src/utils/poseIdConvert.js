const poseIdConvert = (curPoseId)=>{
    if (curPoseId === 0) return 1;
    else if (curPoseId === 3) return 2;
    else if (curPoseId === 1 || curPoseId === 2) return 3;
    return 4;

}
export default poseIdConvert;