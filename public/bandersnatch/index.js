const MANIFEST_URL = 'manifest.json';
const localhost = ['127.0.0.1', 'localhost']

async function main() {
    const isLocal = !!localhost.indexOf(window.location.hostname);    
    const manifestJSON = await (await fetch(MANIFEST_URL)).json()
    const host = isLocal ? manifestJSON.localHost : manifestJSON.productionHost;
    
    const videoComponent = new VideoComponent();
    const network = new Network({ host });
    const videoPlayer = new VideoMediaPlayer({
        manifestJSON,
        network,
        videoComponent,
    });

    videoPlayer.initialzeCodec();
    videoComponent.initializePlayer();

    window.nextChunk = (data) => videoPlayer.nextChunk(data);
}

window.onload = main