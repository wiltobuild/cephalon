import { ItemImage } from "./item-image";
export function FormaCost({
  investment = "",
  audit,
}: {
  investment?: string;
  audit?: { count: number | null; note: string };
}) {
  const match = investment.match(/(\d+(?:\s*[-–]\s*\d+)?)\s*forma/i);
  const cost =
    audit?.count?.toString() ??
    match?.[1] ??
    (/no forma|zero forma/i.test(investment) ? "0" : null);
  return (
    <span
      className="forma-cost"
      title={audit?.note ?? investment ?? "Forma cost not specified in guide"}
    >
      <ItemImage name="Forma" kind="forma" />
      <span>
        {cost === null ? "Forma: unspecified" : `${cost} Forma`}
        {cost && /per brother/i.test(investment) ? " / brother" : ""}
        {cost !== null && (
          <small>{audit?.count != null ? " · layout" : " · guide"}</small>
        )}
      </span>
    </span>
  );
}
