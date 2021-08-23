import _ from "lodash";

export default {
  install(app) {
    // eslint-disable-next-line max-len
    const baseComponents = require.context("../components/base", false, /[A-Za-z0-9-_,\s]+\.vue$/i);
    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName);
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")),
      );
      app.component(`Base${componentName}`, componentConfig.default || componentConfig);
    });

    // console.log("app", app, _);
  },
};
