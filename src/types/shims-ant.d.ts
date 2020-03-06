import 'ant-design-vue/types/upload';
import 'ant-design-vue/types/form/form';

declare module 'ant-design-vue/types/upload' {
    interface ExUploadFile extends UploadFile {
        status: 'done' | 'error' | 'removed' | 'uploading';
        url: string;
        thumbUrl: string;
        originFileObj: File;
    }
    interface UploadingFileInfo {
        event: Event;
        file: ExUploadFile;
        fileList: ExUploadFile[];
    }
    interface DoneUploadFileInfo {
        file: ExUploadFile;
        fileList: ExUploadFile[];
    }
}
