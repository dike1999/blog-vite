import{aj as e,a8 as u,j as a,ak as d}from"./index.5e1275c5.js";const i=({total:s,current:n,onChange:r,pageSize:p,style:t={}})=>{const o=u.exports.useMediaQuery({query:"(max-width: f736px)"});return a("div",{className:"app-pagination",style:t,children:a(d,{hideOnSinglePage:!0,current:n,onChange:r,total:s,pageSize:p,simple:o})})};i.propTypes={total:e.number.isRequired,onChange:e.func.isRequired,current:e.number.isRequired,pageSize:e.number};i.defaultProps={pageSize:10};export{i as W};
