import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, Pencil } from "lucide-react";

interface SignaturePadProps {
  value: string;
  onChange: (signature: string) => void;
}

const SignaturePad = ({ value, onChange }: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<"draw" | "upload">("draw");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set drawing style
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Load existing signature if any
    if (value && mode === "draw") {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = value;
    }
  }, [mode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      e.preventDefault();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        onChange(canvas.toDataURL());
      }
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 mb-2">
        <Button
          type="button"
          variant={mode === "draw" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("draw")}
          className="flex-1"
        >
          <Pencil className="w-4 h-4 mr-1" />
          Draw
        </Button>
        <Button
          type="button"
          variant={mode === "upload" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("upload")}
          className="flex-1"
        >
          <Upload className="w-4 h-4 mr-1" />
          Upload
        </Button>
      </div>

      {mode === "draw" ? (
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-24 border border-border rounded-lg bg-card cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSignature}
            className="absolute top-1 right-1 h-6 w-6 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
          />
          {value && (
            <div className="relative">
              <img src={value} alt="Signature" className="h-24 object-contain border border-border rounded-lg bg-card p-2" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onChange("")}
                className="absolute top-1 right-1 h-6 w-6 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
