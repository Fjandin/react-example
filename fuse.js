const {
    FuseBox,
    SVGPlugin,
    CSSPlugin,
    CSSModules,
    PostCSS,
    BabelPlugin,
    QuantumPlugin,
    WebIndexPlugin,
    Sparky
} = require("fuse-box");

let fuse, app, vendor, isProduction;

Sparky.task("config", () => {
    fuse = new FuseBox({
        homeDir: "src/",
        sourceMaps: false, // !isProduction,
        hash: isProduction,
        output: "dist/$name.js",
        useTypescriptCompiler: true,
        experimentalFeatures: true,
        alias: {
            styles: '~/styles',
            images: '~/images'
        },
        plugins: [
            SVGPlugin(),
            [CSSModules({useDefault: false}), PostCSS([require('postcss-cssnext')]), CSSPlugin()],
            WebIndexPlugin({
                template: "src/index.html"
            }),
            isProduction && QuantumPlugin({
                treeshake: true,
                uglify: true
            })
        ]
    });
    // vendor
    vendor = fuse.bundle("vendor").instructions("~ index.jsx")

    // bundle app
    app = fuse.bundle("app").instructions("> [index.jsx]")
});

Sparky.task("default", ["clean", "config"], () => {
    fuse.dev();
    // add dev instructions
    app.watch().hmr()
    return fuse.run();
});

Sparky.task("clean", () => Sparky.src("dist/").clean("dist/"));
Sparky.task("prod-env", ["clean"], () => { isProduction = true })
Sparky.task("dist", ["prod-env", "config"], () => {
    // comment out to prevent dev server from running (left for the demo)
    fuse.dev();
    return fuse.run();
});
