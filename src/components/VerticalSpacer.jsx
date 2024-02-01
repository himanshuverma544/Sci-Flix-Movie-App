const VerticalSpacer = ({ p: paddingValue = "0", m: marginValue = "0" }) => {

  return (
    <div className={`p-${paddingValue} m-${marginValue}`}/>
  );
}

export default VerticalSpacer;