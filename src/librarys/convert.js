function blobToArrayBuffer(blob) {
    return new Promise((resolve) => {
        const fileReader = new FileReader();

        fileReader.onload = function () {
            resolve(fileReader.result);
        };

        fileReader.readAsArrayBuffer(blob);
    });
}

// function float32ArrayToBlob(float32Array) {
//     const interleaved = new Float32Array(float32Array.length);
//     interleaved.set(float32Array);
//     return new Blob([interleaved], { type: "audio/wav" });
// }

export async function getSampleRate(blob) {
    const audioContext = new AudioContext();
    const arrayBuffer = await blobToArrayBuffer(blob);
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    return audioBuffer.sampleRate;
    // const outputBuffer = audioContext.createBuffer(
    //     1,
    //     audioBuffer.length,
    //     sampleRate,
    // );

    // const inputSource = audioContext.createBufferSource();
    // inputSource.buffer = audioBuffer;

    // const outputSource = audioContext.createBufferSource();
    // outputSource.buffer = outputBuffer;

    // inputSource.connect(outputSource);

    // inputSource.start();
    // outputSource.start();

    // return float32ArrayToBlob(outputBuffer.getChannelData(0));
}
