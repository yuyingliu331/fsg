
// app.directive('script', function() {
//     return {
//       restrict: 'E',
//       scope: false,
//       link: function(scope, elem, attr)
//       {
//         console.log("linking...");
//         if (attr.type === 'text/javascript-lazy')
//         {
//           console.log("and it's lazy...");
//           var s = document.createElement("script");
//           s.type = "text/javascript";
//           var src = elem.attr('src');
//           if (src!==undefined)
//           {
//             console.log("it has a source!")
//               s.src = src;
//           }
//           else
//           {
//               var code = elem.text();
//               s.text = code;
//           }
//           // document.head.appendChild(s);
//           elem.parent().append(s);
//           elem.remove();
//         }
//       }
//     };
//   });
