import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Download, Eye, FileText, Building2, User, CreditCard, Phone, Mail, MapPin, Hash, Calendar, Landmark, PenLine, Wallet, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SignaturePad from "./SignaturePad";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  invoiceNumber: string;
  accountNumber: string;
  invoiceDate: string;
  dueDate: string;
  // From (Business)
  businessName: string;
  businessTagline: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessLogo: string;
  // To (Client)
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  // Bank Details
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  // Items
  items: InvoiceItem[];
  // Tax & Terms
  taxRate: number;
  termsConditions: string;
  signature: string;
  currency: string;
}

const CURRENCIES: { [key: string]: { symbol: string; name: string } } = {
  USD: { symbol: "$", name: "US Dollar" },
  PKR: { symbol: "Rs", name: "Pakistani Rupee" },
  INR: { symbol: "₹", name: "Indian Rupee" },
  GBP: { symbol: "£", name: "British Pound" },
  EUR: { symbol: "€", name: "Euro" },
};

const PAKISTAN_BANKS = [
  { name: "JazzCash", bankName: "JazzCash" },
  { name: "EasyPaisa", bankName: "EasyPaisa (Telenor Microfinance Bank)" },
  { name: "SadaPay", bankName: "SadaPay" },
  { name: "HBL", bankName: "Habib Bank Limited (HBL)" },
  { name: "UBL", bankName: "United Bank Limited (UBL)" },
  { name: "MCB", bankName: "MCB Bank Limited" },
  { name: "Meezan", bankName: "Meezan Bank" },
  { name: "Allied Bank", bankName: "Allied Bank Limited" },
  { name: "Bank Alfalah", bankName: "Bank Alfalah" },
  { name: "Faysal Bank", bankName: "Faysal Bank Limited" },
];

const INDIA_BANKS = [
  { name: "SBI", bankName: "State Bank of India (SBI)" },
  { name: "HDFC", bankName: "HDFC Bank" },
  { name: "ICICI", bankName: "ICICI Bank" },
  { name: "Axis", bankName: "Axis Bank" },
  { name: "Kotak", bankName: "Kotak Mahindra Bank" },
  { name: "PNB", bankName: "Punjab National Bank (PNB)" },
  { name: "Bank of Baroda", bankName: "Bank of Baroda" },
  { name: "Canara", bankName: "Canara Bank" },
  { name: "IndusInd", bankName: "IndusInd Bank" },
  { name: "Yes Bank", bankName: "Yes Bank" },
  { name: "Paytm", bankName: "Paytm Payments Bank" },
  { name: "PhonePe", bankName: "PhonePe (Yes Bank)" },
  { name: "GPay", bankName: "Google Pay (Various Banks)" },
];

const LOGO_DEV_API_KEY = "pk_U5aNfekTSY6yrDLFn1ynbw";

const STORAGE_KEY = "freeinvoicegen_data";

const getInitialData = (): InvoiceData => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure items array exists with at least one item
      if (!parsed.items || parsed.items.length === 0) {
        parsed.items = [{ id: "1", description: "", quantity: 1, price: 0 }];
      }
      // Generate new invoice number and dates for each session
      return {
        ...parsed,
        invoiceNumber: Math.floor(100000000 + Math.random() * 900000000).toString(),
        invoiceDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        items: [{ id: "1", description: "", quantity: 1, price: 0 }],
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        clientAddress: "",
      };
    } catch {
      // Return default if parsing fails
    }
  }
  
  return {
    invoiceNumber: Math.floor(100000000 + Math.random() * 900000000).toString(),
    accountNumber: Math.floor(100000000 + Math.random() * 900000000).toString(),
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    businessName: "",
    businessTagline: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    businessLogo: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
    items: [{ id: "1", description: "", quantity: 1, price: 0 }],
    taxRate: 0,
    termsConditions: "Payment is due within 30 days of invoice date. Late payments may incur additional charges.",
    signature: "",
    currency: "USD",
  };
};

const InvoiceForm = () => {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(getInitialData);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingJPG, setIsGeneratingJPG] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const logoDebounceRef = useRef<NodeJS.Timeout>();

  // Save to localStorage when data changes (except invoice-specific fields)
  useEffect(() => {
    const dataToSave = {
      businessName: invoiceData.businessName,
      businessTagline: invoiceData.businessTagline,
      businessEmail: invoiceData.businessEmail,
      businessPhone: invoiceData.businessPhone,
      businessAddress: invoiceData.businessAddress,
      businessLogo: invoiceData.businessLogo,
      bankName: invoiceData.bankName,
      bankAccountName: invoiceData.bankAccountName,
      bankAccountNumber: invoiceData.bankAccountNumber,
      bankRoutingNumber: invoiceData.bankRoutingNumber,
      termsConditions: invoiceData.termsConditions,
      signature: invoiceData.signature,
      currency: invoiceData.currency,
      accountNumber: invoiceData.accountNumber,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [invoiceData]);

  // Fetch logo from Logo.dev when business name changes
  const fetchLogo = async (query: string) => {
    if (!query || query.length < 2) {
      setInvoiceData(prev => ({ ...prev, businessLogo: "" }));
      return;
    }

    // Extract domain if it looks like a URL or add .com
    let domain = query.toLowerCase().trim();
    if (!domain.includes(".")) {
      domain = `${domain.replace(/\s+/g, "")}.com`;
    }

    setLogoLoading(true);
    try {
      const logoUrl = `https://img.logo.dev/${domain}?token=${LOGO_DEV_API_KEY}&size=128`;
      
      // Test if the logo exists
      const response = await fetch(logoUrl, { method: "HEAD" });
      if (response.ok) {
        setInvoiceData(prev => ({ ...prev, businessLogo: logoUrl }));
      } else {
        setInvoiceData(prev => ({ ...prev, businessLogo: "" }));
      }
    } catch {
      setInvoiceData(prev => ({ ...prev, businessLogo: "" }));
    } finally {
      setLogoLoading(false);
    }
  };

  const handleBusinessNameChange = (value: string) => {
    setInvoiceData(prev => ({ ...prev, businessName: value }));
    
    // Debounce logo fetch
    if (logoDebounceRef.current) {
      clearTimeout(logoDebounceRef.current);
    }
    logoDebounceRef.current = setTimeout(() => {
      fetchLogo(value);
    }, 500);
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { id: Date.now().toString(), description: "", quantity: 1, price: 0 },
      ],
    });
  };

  const removeItem = (id: string) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData({
        ...invoiceData,
        items: invoiceData.items.filter((item) => item.id !== id),
      });
    }
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const applyBankPreset = (preset: { name: string; bankName: string }) => {
    setInvoiceData({
      ...invoiceData,
      bankName: preset.bankName,
    });
    toast({
      title: `${preset.name} Selected`,
      description: "Bank name has been filled. Add your account number.",
    });
  };

  const currencySymbol = CURRENCIES[invoiceData.currency]?.symbol || "$";

  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const tax = subtotal * (invoiceData.taxRate / 100);
  const total = subtotal + tax;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setInvoiceData(prev => ({ ...prev, businessLogo: result }));
      toast({
        title: "Logo Uploaded!",
        description: "Your business logo has been added to the invoice.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleGeneratePDF = async () => {
    if (!invoiceRef.current) return;

    setIsGeneratingPDF(true);
    toast({
      title: "Generating PDF...",
      description: "Please wait while we create your invoice.",
    });

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);

      toast({
        title: "PDF Downloaded!",
        description: "Your invoice has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleGenerateJPG = async () => {
    if (!invoiceRef.current) return;

    setIsGeneratingJPG(true);
    toast({
      title: "Generating JPG...",
      description: "Please wait while we create your invoice image.",
    });

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `invoice-${invoiceData.invoiceNumber}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();

      toast({
        title: "JPG Downloaded!",
        description: "Your invoice image has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate JPG. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingJPG(false);
    }
  };

  const handleGeneratePNG = async () => {
    if (!invoiceRef.current) return;

    toast({
      title: "Generating PNG...",
      description: "Please wait while we create your invoice image.",
    });

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `invoice-${invoiceData.invoiceNumber}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "PNG Downloaded!",
        description: "Your invoice image has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PNG. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="invoice-tool" className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Create Your Invoice Online – Simple & Fast
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fill in the details below using our <strong>invoice generator free</strong> tool to generate a professional invoice PDF instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form */}
          <div className="space-y-6">
            {/* Invoice Details */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Invoice Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoiceNumber" className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      Invoice Number
                    </Label>
                    <Input
                      id="invoiceNumber"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          invoiceNumber: e.target.value,
                        })
                      }
                      placeholder="777764554"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      Account Number
                    </Label>
                    <Input
                      id="accountNumber"
                      value={invoiceData.accountNumber}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          accountNumber: e.target.value,
                        })
                      }
                      placeholder="834763763"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="invoiceDate" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Invoice Date
                    </Label>
                    <Input
                      id="invoiceDate"
                      type="date"
                      value={invoiceData.invoiceDate}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          invoiceDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueDate" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                {/* Currency Selector */}
                <div>
                  <Label className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-muted-foreground" />
                    Currency
                  </Label>
                  <Select
                    value={invoiceData.currency}
                    onValueChange={(value) => setInvoiceData({ ...invoiceData, currency: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
                        <SelectItem key={code} value={code}>
                          {symbol} - {name} ({code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Your Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    Business Name or Domain
                    {logoLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                  </Label>
                  <Input
                    id="businessName"
                    value={invoiceData.businessName}
                    onChange={(e) => handleBusinessNameChange(e.target.value)}
                    placeholder="Your Company Name or domain (e.g., google.com)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter a business name or website domain to auto-fetch the logo
                  </p>
                </div>
                {/* Logo Upload */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                    Upload Custom Logo (Optional)
                  </Label>
                  <div className="flex items-center gap-4">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => logoInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Logo
                    </Button>
                    {invoiceData.businessLogo && (
                      <div className="flex items-center gap-2">
                        <img 
                          src={invoiceData.businessLogo} 
                          alt="Logo Preview" 
                          className="h-10 w-10 object-contain border rounded"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setInvoiceData(prev => ({ ...prev, businessLogo: "" }))}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="businessTagline" className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    Business Tagline
                  </Label>
                  <Input
                    id="businessTagline"
                    value={invoiceData.businessTagline}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        businessTagline: e.target.value,
                      })
                    }
                    placeholder="Your business tagline or description"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessEmail" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email
                    </Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={invoiceData.businessEmail}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          businessEmail: e.target.value,
                        })
                      }
                      placeholder="business@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessPhone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Phone
                    </Label>
                    <Input
                      id="businessPhone"
                      type="tel"
                      value={invoiceData.businessPhone}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          businessPhone: e.target.value,
                        })
                      }
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="businessAddress" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Address
                  </Label>
                  <Textarea
                    id="businessAddress"
                    value={invoiceData.businessAddress}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        businessAddress: e.target.value,
                      })
                    }
                    placeholder="123 Business Street, City, State 12345"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Client Details */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Client Details (Invoice To)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clientName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Client Name
                  </Label>
                  <Input
                    id="clientName"
                    value={invoiceData.clientName}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, clientName: e.target.value })
                    }
                    placeholder="Client or Company Name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientEmail" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email
                    </Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={invoiceData.clientEmail}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          clientEmail: e.target.value,
                        })
                      }
                      placeholder="client@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientPhone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Phone
                    </Label>
                    <Input
                      id="clientPhone"
                      type="tel"
                      value={invoiceData.clientPhone}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          clientPhone: e.target.value,
                        })
                      }
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="clientAddress" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Address
                  </Label>
                  <Textarea
                    id="clientAddress"
                    value={invoiceData.clientAddress}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        clientAddress: e.target.value,
                      })
                    }
                    placeholder="456 Client Street, City, State 67890"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-primary" />
                  Bank Transfer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Fill Buttons - Pakistan */}
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">🇵🇰 Pakistani Banks & Payment Methods</Label>
                  <div className="flex flex-wrap gap-2">
                    {PAKISTAN_BANKS.map((preset) => (
                      <Button
                        key={preset.name}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => applyBankPreset(preset)}
                        className="text-xs"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
                {/* Quick Fill Buttons - India */}
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">🇮🇳 Indian Banks & Payment Methods</Label>
                  <div className="flex flex-wrap gap-2">
                    {INDIA_BANKS.map((preset) => (
                      <Button
                        key={preset.name}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => applyBankPreset(preset)}
                        className="text-xs"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankName" className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-muted-foreground" />
                      Bank Name
                    </Label>
                    <Input
                      id="bankName"
                      value={invoiceData.bankName}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          bankName: e.target.value,
                        })
                      }
                      placeholder="Bank of America"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankAccountName" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Account Holder Name
                    </Label>
                    <Input
                      id="bankAccountName"
                      value={invoiceData.bankAccountName}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          bankAccountName: e.target.value,
                        })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankAccountNumber" className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      Account Number
                    </Label>
                    <Input
                      id="bankAccountNumber"
                      value={invoiceData.bankAccountNumber}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankRoutingNumber" className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      Routing Number
                    </Label>
                    <Input
                      id="bankRoutingNumber"
                      value={invoiceData.bankRoutingNumber}
                      onChange={(e) =>
                        setInvoiceData({
                          ...invoiceData,
                          bankRoutingNumber: e.target.value,
                        })
                      }
                      placeholder="021000021"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items Section */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Items & Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-3 p-4 bg-muted/20 rounded-lg border border-border/50"
                  >
                    <div className="flex-1">
                      <Label>Item Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                        placeholder="Product or service name"
                      />
                    </div>
                    <div className="w-full sm:w-20">
                      <Label>Qty</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            parseInt(e.target.value) || 1
                          )
                        }
                      />
                    </div>
                    <div className="w-full sm:w-28">
                      <Label>Price ({currencySymbol})</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={invoiceData.items.length === 1}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addItem}
                  className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Item
                </Button>
              </CardContent>
            </Card>

            {/* Tax, Terms & Signature */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PenLine className="w-5 h-5 text-primary" />
                  Tax, Terms & Signature
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-full sm:w-40">
                  <Label htmlFor="taxRate" className="flex items-center gap-2">
                    Tax Rate (%)
                  </Label>
                  <Input
                    id="taxRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={invoiceData.taxRate}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        taxRate: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="termsConditions" className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    Terms & Conditions
                  </Label>
                  <Textarea
                    id="termsConditions"
                    value={invoiceData.termsConditions}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, termsConditions: e.target.value })
                    }
                    placeholder="Payment terms and conditions..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <PenLine className="w-4 h-4 text-muted-foreground" />
                    Signature
                  </Label>
                  <SignaturePad
                    value={invoiceData.signature}
                    onChange={(signature) => setInvoiceData({ ...invoiceData, signature })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Professional Invoice Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card className="border border-primary/20 shadow-lg bg-card overflow-hidden">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Live Invoice Preview
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Updates as you type
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Invoice Preview - Professional Template */}
                <div ref={invoiceRef} className="bg-white min-h-[700px] text-gray-900">
                  {/* Header Section - Dark with Orange */}
                  <div className="relative">
                    {/* Dark background with diagonal orange */}
                    <div className="bg-gray-800 text-white relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-0 h-0 border-l-[200px] border-l-orange-500 border-t-[250px] border-t-orange-500 border-r-[100px] border-r-transparent"></div>
                      <div className="relative z-10 p-6">
                        {/* Logo Area */}
                        <div className="flex items-center gap-2 mb-4">
                          {invoiceData.businessLogo ? (
                            <img 
                              src={invoiceData.businessLogo} 
                              alt="Business Logo" 
                              className="w-12 h-12 object-contain bg-white rounded p-1"
                              crossOrigin="anonymous"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xl">★</span>
                            </div>
                          )}
                        </div>
                        {/* Business Name & Tagline */}
                        <div className="text-orange-500 font-bold text-lg uppercase">
                          {invoiceData.businessName || "YOUR BUSINESS NAME"}
                        </div>
                        <div className="text-orange-400 text-sm italic">
                          {invoiceData.businessTagline || "Your business tagline"}
                        </div>
                      </div>
                      {/* Invoice Title Area - Right Side */}
                      <div className="absolute top-0 right-0 bg-gray-800/90 p-6 text-right">
                        <h1 className="text-3xl font-bold text-white tracking-wider">INVOICE</h1>
                        <div className="mt-3 space-y-1 text-sm text-gray-300">
                          <p>Invoice No : {invoiceData.invoiceNumber || "777764554"}</p>
                          <p>Account No : {invoiceData.accountNumber || "834763763"}</p>
                          <p>Date : {invoiceData.invoiceDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="p-6 space-y-6">
                    {/* Client & Bank Info Row */}
                    <div className="flex justify-between items-start">
                      {/* Bank Transfer Info */}
                      <div>
                        <h3 className="text-orange-500 font-bold text-sm uppercase mb-2">Bank Transfer</h3>
                        <div className="text-xs text-gray-600 space-y-0.5">
                          {invoiceData.bankName && <p>Bank: {invoiceData.bankName}</p>}
                          {invoiceData.bankAccountName && <p>Name: {invoiceData.bankAccountName}</p>}
                          {invoiceData.bankAccountNumber && <p>Account: {invoiceData.bankAccountNumber}</p>}
                          {invoiceData.bankRoutingNumber && <p>Routing: {invoiceData.bankRoutingNumber}</p>}
                          {!invoiceData.bankName && !invoiceData.bankAccountNumber && (
                            <p className="italic">Add your bank details</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Invoice To */}
                      <div className="text-right">
                        <h3 className="font-bold text-sm mb-2">Invoice to</h3>
                        <p className="font-semibold">{invoiceData.clientName || "Client Name"}</p>
                        <div className="text-xs text-gray-600 space-y-0.5 mt-1">
                          <p>{invoiceData.clientAddress || "Client Address"}</p>
                          {invoiceData.clientEmail && <p>{invoiceData.clientEmail}</p>}
                          {invoiceData.clientPhone && <p>Telp. {invoiceData.clientPhone}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Items Table */}
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-orange-500 text-white">
                          <tr>
                            <th className="text-left p-3 font-medium">Item</th>
                            <th className="text-center p-3 font-medium w-16">Qty.</th>
                            <th className="text-center p-3 font-medium w-20">Price</th>
                            <th className="text-right p-3 font-medium w-24">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceData.items.map((item, index) => (
                            <tr key={item.id} className="border-t border-gray-300">
                              <td className="p-3">
                                {item.description || "Item description"}
                              </td>
                              <td className="text-center p-3">
                                {item.quantity}
                              </td>
                              <td className="text-center p-3">
                                {currencySymbol}{item.price.toFixed(2)}
                              </td>
                              <td className="text-right p-3 font-medium">
                                {currencySymbol}{(item.quantity * item.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end">
                      <div className="w-56 space-y-2 text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600 uppercase">Subtotal</span>
                          <span>{currencySymbol}{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600 uppercase">Tax ({invoiceData.taxRate}%)</span>
                          <span>{currencySymbol}{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-t border-gray-800 font-bold text-base">
                          <span className="uppercase">Total</span>
                          <span>{currencySymbol}{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Terms & Signature Row */}
                    <div className="flex justify-between items-end pt-4">
                      {/* Terms & Conditions */}
                      <div className="max-w-xs">
                        <h3 className="text-orange-500 font-bold text-sm uppercase mb-2">Term & Conditions</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {invoiceData.termsConditions || "For description your term and conditions about invoice"}
                        </p>
                      </div>
                      
                      {/* Signature */}
                      <div className="text-center">
                        {invoiceData.signature ? (
                          <img 
                            src={invoiceData.signature} 
                            alt="Signature" 
                            className="h-12 w-32 object-contain mb-1"
                          />
                        ) : (
                          <div className="h-12 w-32 border-b border-gray-800 mb-1"></div>
                        )}
                        <p className="text-xs italic text-gray-600">
                          Signature
                        </p>
                      </div>
                    </div>

                    {/* Thank You */}
                    <div className="pt-4">
                      <h2 className="text-2xl font-bold text-orange-500 uppercase tracking-wide">THANK YOU</h2>
                    </div>
                  </div>

                  {/* Footer Decoration */}
                  <div className="relative h-8 overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-full h-full">
                      <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[150px] border-r-orange-500 border-b-[40px] border-b-orange-500 border-t-[40px] border-t-transparent"></div>
                      <div className="absolute bottom-0 right-[120px] w-0 h-0 border-r-[60px] border-r-gray-800 border-b-[25px] border-b-gray-800 border-t-[25px] border-t-transparent"></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-muted/30 border-t space-y-3">
                  <Button
                    onClick={handleGeneratePDF}
                    size="lg"
                    disabled={isGeneratingPDF || isGeneratingJPG}
                    className="w-full text-lg py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                  >
                    {isGeneratingPDF ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Download Invoice PDF
                      </>
                    )}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={handleGenerateJPG}
                      size="sm"
                      variant="outline"
                      disabled={isGeneratingPDF || isGeneratingJPG}
                      className="flex-1"
                    >
                      {isGeneratingJPG ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          JPG...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4 mr-1" />
                          Download JPG
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleGeneratePNG}
                      size="sm"
                      variant="outline"
                      disabled={isGeneratingPDF || isGeneratingJPG}
                      className="flex-1"
                    >
                      <ImageIcon className="w-4 h-4 mr-1" />
                      Download PNG
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceForm;
