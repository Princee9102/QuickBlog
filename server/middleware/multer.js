import multer from 'multer';

const upload=multer({storage:multer.diskStorage({})  // destination folder for uploaded files
});

export default upload;