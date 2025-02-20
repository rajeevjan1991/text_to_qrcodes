import JsBarcode from "jsbarcode";

export const generateBarcode = (
	barcodeElement: SVGSVGElement,
	barcodeData: string,
	barcodeConfig: JsBarcode.Options,
	textDecoration: string,
) => {
	try {
		JsBarcode(barcodeElement, barcodeData, barcodeConfig);
		if (barcodeElement.querySelector("text")) {
			const textElement = barcodeElement.querySelector("text");
			textElement?.setAttribute("text-decoration", textDecoration);
		}
		return "";
	} catch (err) {
		return "Invalid barcode data for the selected type";
	}
};

export const downloadBarcode = (
	barcodeRef: React.RefObject<SVGSVGElement | null>,
	format: string,
) => {
	if (barcodeRef.current) {
		const svgData = new XMLSerializer().serializeToString(barcodeRef.current);
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const img = new Image();
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx?.drawImage(img, 0, 0);
			const dataURL = canvas.toDataURL(`image/${format}`);
			const link = document.createElement("a");
			link.download = `barcode.${format}`;
			link.href = dataURL;
			link.click();
		};
		img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
	}
};
