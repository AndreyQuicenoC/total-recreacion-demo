import logo from "../../../imports/Logo-Total.png";

export function LogoMark({ size = 40, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Total Recreación" style={{ height: size, width: size }} className="object-contain drop-shadow-sm" />
      {withText && (
        <div className="leading-tight">
          <div className="font-semibold tracking-tight" style={{ color: "#0D0D0D" }}>Total Recreación</div>
          <div className="text-[10px] uppercase tracking-widest" style={{ color: "#F23545" }}>Cali · Garantía Total</div>
        </div>
      )}
    </div>
  );
}
