const RADIAL = {
  cp: { title:"Core Principles", color:"var(--ag-teal)", children:[
    {label:"Actuarial Statistics", codes:["CS1","CS2"]},
    {label:"Actuarial Mathematics", codes:["CM1","CM2"]},
    {label:"Business", codes:["CB1","CB2","CB3"]}
  ]},
  cpr: { title:"Core Practices", color:"var(--ag-gold)", children:[
    {label:"Actuarial Practice", codes:["CP1"]},
    {label:"Modelling Practice", codes:["CP2"]},
    {label:"Communications Practice", codes:["CP3"]}
  ]},
  sp: { title:"Specialist Principles", color:"var(--ag-purple)", children:[
    {label:"Alternative", codes:["SP0"]},
    {label:"Health and Care", codes:["SP1"]},
    {label:"Life Insurance", codes:["SP2"]},
    {label:"Pensions & Other Benefits", codes:["SP4"]},
    {label:"Investment and Finance", codes:["SP5","SP6"]},
    {label:"General Insurance", codes:["SP7","SP8"]},
    {label:"Enterprise Risk Mgmt", codes:["SP9"]},
    {label:"Banking", codes:["SP10"]}
  ]},
  sa: { title:"Specialist Advanced", color:"var(--ag-pink)", children:[
    {label:"Alternative", codes:["SA0"]},
    {label:"Health and Care", codes:["SA1"]},
    {label:"Life Insurance", codes:["SA2"]},
    {label:"Pensions & Other Benefits", codes:["SA4"]},
    {label:"Investment and Finance", codes:["SA7"]},
    {label:"General Insurance", codes:["SA3"]},
    {label:"Banking", codes:["SA10"]}
  ]}
};

export default RADIAL;
