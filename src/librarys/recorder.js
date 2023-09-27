export class Recorder {
    instance = null;
    chunks = null;

    constructor() {}

    start(stream) {
        if (!this.instance) {
            this.instance = new MediaRecorder(stream, {
                mimeType: "audio/webm",
            });
        }

        if (this.instance.state == "recording") {
            this.instance.stop();
        }

        this.chunks = [];

        this.instance.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.chunks.push(event.data);
            }

            if (this.instance.state == "inactive") {
                this.onComplete(
                    new Blob(this.chunks, {
                        type: "audio/webm",
                    }),
                );
            }

            this.onData(event);
        };

        this.instance.start(3000);
    }

    stop() {
        if (!this.instance || this.instance.state != "recording") {
            return;
        }

        this.instance.stop();
    }

    onData(event) {}

    onComplete(event) {}
}
