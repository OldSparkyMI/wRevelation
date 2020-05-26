export class NativeFileSystemApi {

    /**
     * check if browser supports native file api
     * true: the native file system api is available
     * false: only legacy mode available
     */
    static hasNativeFS = !!((window as any).chooseFileSystemEntries);

}
