export const getBase64 = (
    img: File,
    callback: (imageURL: string | ArrayBuffer | null) => void
) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const isLt5M = (file: File) => {
    return file.size < 5 * 1024 * 1024;
};
