const funcBody = `
;;function write_ws_xml_datavalidation(validations) {
  var o = '<dataValidations>';
  for(var i=0; i < validations.length; i++) {
    var validation = validations[i];
    if(validation.type=="list"){
      o += '<dataValidation type="list" allowBlank="1" sqref="' + validation.sqref + '">';
      o += '<formula1>&quot;' + validation.values + '&quot;</formula1>';
      o += '</dataValidation>';
    }
    if(validation.type=="decimal"){
      o += '<dataValidation type="decimal" allowBlank="1" showInputMessage="1" showErrorMessage="1" sqref="' + validation.sqref + '">';
      o += '<formula1>' + validation.min + '</formula1>';
      o += '<formula2>' + validation.max + '</formula2>';
      o += '</dataValidation>';
    }
  }
  o += '</dataValidations>';
  return o;
};;
`;
module.exports = function(input) {
  const needle = `write_ws_xml_merges(ws['!merges']`;
  const start = input.indexOf(needle);
  const nextLineIndex = input.indexOf('\n', start);
  const funcCallCode = `
    if(ws['!dataValidation']) o[o.length] = write_ws_xml_datavalidation(ws['!dataValidation']);
  `;
  return funcBody + input.substr(0, nextLineIndex) + funcCallCode + input.substr(nextLineIndex + 1);
}

