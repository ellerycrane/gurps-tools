(function () {
  function textNodesUnder(el){
    let n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
    while(n=walk.nextNode()) a.push(n);
    return a;
  }

  let body=document.getElementsByTagName("BODY")[0], textnodes = textNodesUnder(body), _nv, i, len;
  for (i = 0, len = textnodes.length; i < len; i++) {
    _nv = textnodes[i].nodeValue;
    textnodes[i].nodeValue = _nv.replace(/\u0097/g, "\u2014");
  }
})();