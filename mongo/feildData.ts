import { Schema } from './index';

export const feildData = (feildName: string, data: any) => {
  async function schemaDataMapper(schema: any, dataToMap: any) {
    let dataToReturn: any;
    function dataMapping(ofSchema?: any) {
      if (typeof ofSchema == 'string' && schema.options.enum) {
        if (schema.options.enum.indexOf(dataToMap) != -1)
          dataToReturn = dataToMap;
        else
          throw new Error(
            `Validation failed ${dataToMap} does not suit on enum assigned`
          );
      } else dataToReturn = dataToMap;
    }
    function checkForTypeOfFnObject(fnObject: any) {
      // this is objectId
      fnObject.isValid
        ? fnObject.isValid(dataToMap)
          ? dataMapping()
          : ''
        : '';
      //this is array
      if (Array.isArray(fnObject)) {
        if (Array.isArray(dataToMap)) {
          dataToMap.forEach(dataElement =>
            schemaDataMapper(Schema[0], dataElement)
          );
        } else {
          throw new Error(
            `Validation Failed:Feild ${dataToMap} is not an Array as what assigned in schema`
          );
        }
      }
      // console.log(Schema);
      JSON.stringify(Object.keys(Schema)) ==
      JSON.stringify(Object.keys(dataToMap))
        ? dataMapping()
        : console.log(
            'more to do in this as keys need to be tested in details'
          );
    }
    function checkForFnType(fn: any) {
      if (typeof fn() == 'function') {
        if (typeof fn()() == 'object') {
          checkForTypeOfFnObject(fn()());
        } else {
          typeof fn()() == typeof dataToMap
            ? dataMapping(fn()())
            : eval(
                'throw new Error(`Feild ${dataToMap} data type is not equal to Schema`)'
              );
        }
      } else {
        if (typeof fn() == 'object') {
          checkForTypeOfFnObject(fn()());
        } else {
          typeof fn() == typeof dataToMap
            ? dataMapping(fn())
            : eval(
                'throw new Error(`Feild ${dataToMap} data type is not equal to Schema`)'
              );
        }
      }
    }
    checkForFnType(schema.fn);
    return dataToReturn;
  }

  return new Promise((resolve, reject) => {
    const objectSchema = Schema[feildName];
    const keys = Object.keys(objectSchema);
    const newData: any = {};
    keys.forEach(async (e, i) => {
      if (data[e]) {
        newData[e] = await schemaDataMapper(objectSchema[e], data[e]).catch(
          err => {
            reject(err);
          }
        );
      } else {
        if (objectSchema[e].options.required) {
          if (objectSchema[e].options.default) {
            newData[e] = schemaDataMapper(
              objectSchema[e],
              objectSchema[e].options.default
            );
          } else {
            throw new Error(`feild ${e} is required`);
          }
        }
      }
      if (i == keys.length - 1) resolve(newData);
    });
  });
};
