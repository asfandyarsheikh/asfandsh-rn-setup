const path = require("path");
const {src} = require("./paths");

const rn_android = path.join(src, 'android');
const rn_androidSrc = path.join(rn_android, 'app', 'src', 'main');

const rn_src = path.join(src, 'src')
const rn_assets = path.join(src, 'assets')
const rn_fonts = path.join(rn_assets, 'fonts')
const rn_iconfig = path.join(rn_assets, 'config')
const rn_images = path.join(rn_assets, 'images')
const rn_svg = path.join(rn_assets, 'svg')
const rn_screens = path.join(rn_src, 'screens')
const rn_components = path.join(rn_src, 'components')
const rn_theme = path.join(rn_src, 'theme')
const rn_providers = path.join(rn_src, 'providers')
const rn_models = path.join(rn_src, 'models')
const rn_shared = path.join(rn_src, 'shared')

const rn_dirs = {
    rn_src,
    rn_assets,
    rn_fonts,
    rn_iconfig,
    rn_images,
    rn_svg,
    rn_screens,
    rn_components,
    rn_theme,
    rn_providers,
    rn_models,
    rn_shared
}

module.exports = {rn_android, rn_androidSrc, rn_dirs};
