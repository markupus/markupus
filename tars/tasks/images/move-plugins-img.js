'use strict';

const gulp = tars.packages.gulp;
const cache = tars.packages.cache;
const plumber = tars.packages.plumber;
const notifier = tars.helpers.notifier;
const browserSync = tars.packages.browserSync;

const pluginsImagesFolder = tars.config.fs.staticFolderName + '/'
                            + tars.config.fs.imagesFolderName + '/plugins';

/**
 * Move images for plugins
 */
module.exports = () => {
    return gulp.task('images:move-plugins-img', () => {
        return gulp.src('./markup/' + pluginsImagesFolder + '/**/*.*')
            .pipe(plumber({
                errorHandler(error) {
                    notifier.error('An error occurred while moving plugin\'s imgs.', error);
                }
            }))
            .pipe(cache('move-plugins-img'))
            .pipe(gulp.dest('./dev/' + pluginsImagesFolder))
            .pipe(browserSync.reload({ stream: true }))
            .pipe(
                notifier.success('Plugins\' images\'ve been moved')
            );
    });
};
