//#region Frames fn
// Add Frames
const addFrames = (image, properties = {}, type) => {
    let objId = createNewId();
    // Image
    fabric.Image.fromURL("./images/frames/" + image, function (img) {
        let myFrameImg = img.set({
            top: 0,
            left: 0,
            erasable: false,
            id: objId,
            ...properties,
            originalItem: {
                id: objId,
                ...originalItems
            }
        });
        switch (type) {
            case "frame":
                myFrameImg.set({
                    scaleX: canvas.width / myFrameImg.width,
                    scaleY: canvas.height / myFrameImg.height,
                })
                break;
            case "element":
                myFrameImg.set({
                    scaleX: (canvas.width / myFrameImg.width) / 2,
                    scaleY: (canvas.height / myFrameImg.height) / 2,
                })
                break;
        }
        canvas.add(myFrameImg);
        canvas.centerObject(myFrameImg);
        canvas.renderAll();
    });
    // Layer
    addLayer({
        item: {
            type: originalItems.type,
            image: image,
            id: objId
        },
    });
    saveHistory();
};

//#endregion Frames