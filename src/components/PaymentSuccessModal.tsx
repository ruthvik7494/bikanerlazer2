import React from 'react';
import { CheckCircle2, Copy, Download, FileText, Share2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  productName: string;
  amount: string;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  paymentId,
  productName,
  amount,
}) => {
  const copyToClipboard = () => {
    const text = `Payment Successful!\nProduct: ${productName}\nAmount: ₹${amount}\nPayment ID: ${paymentId}`;
    navigator.clipboard.writeText(text);
    toast.success("Payment details copied to clipboard!");
  };

  const downloadInvoice = () => {
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(249, 115, 22); // Primary color (#f97316)
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("BIKANER LASER", 20, 25);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Precision Laser Cutting & Engraving", 20, 32);

      // Invoice Info
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE / RECEIPT", 20, 60);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Invoice No: INV-${paymentId.slice(-6).toUpperCase()}`, 140, 60);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 65);
      doc.text(`Payment ID: ${paymentId}`, 20, 70);

      // Table Header
      doc.setFillColor(245, 245, 245);
      doc.rect(20, 85, 170, 10, 'F');
      doc.setFont("helvetica", "bold");
      doc.text("Description", 25, 91);
      doc.text("Amount", 160, 91);

      // Table Row
      doc.setFont("helvetica", "normal");
      doc.text(productName, 25, 105);
      doc.text(`INR ${amount}`, 160, 105);

      // Divider
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 115, 190, 115);

      // Total
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Total Paid:", 130, 130);
      doc.setTextColor(249, 115, 22);
      doc.text(`INR ${amount}`, 160, 130);

      // Footer
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.text("Thank you for choosing Bikaner Laser for your precision needs.", 105, 160, { align: "center" });
      doc.text("Contact: +91 91665 62244 | Website: bikanerlaser.com", 105, 165, { align: "center" });

      // Save PDF
      doc.save(`Invoice_${paymentId}.pdf`);
      toast.success("Professional Invoice downloaded!");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF. Downloading text version instead.");
      
      // Fallback to text
      const content = `BIKANER LASER RECEIPT\n\nProduct: ${productName}\nAmount: ₹${amount}\nPayment ID: ${paymentId}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Receipt_${paymentId}.txt`;
      link.click();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-2 border-primary/20 bg-background/95 backdrop-blur-xl rounded-3xl p-0 overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        
        <div className="p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shadow-inner"
            >
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">Payment Successful!</h2>
              <p className="text-muted-foreground font-body">Your premium order has been confirmed.</p>
            </div>

            <div className="w-full bg-muted/40 rounded-3xl p-6 space-y-4 border border-border/60 shadow-sm">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Service / Product</span>
                <span className="font-bold text-foreground">{productName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Total Amount</span>
                <span className="font-display text-lg font-bold text-primary italic">₹{amount}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-4 border-t border-border/50">
                <span className="text-muted-foreground font-medium">Transaction ID</span>
                <span className="font-mono text-[10px] font-bold text-foreground bg-muted-foreground/10 px-2 py-1 rounded-lg select-all">
                  {paymentId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  className="w-full rounded-2xl h-12 flex gap-2 font-bold border-2 transition-all hover:bg-primary/5 hover:border-primary/40 hover:text-primary group"
                >
                  <Copy className="w-4 h-4 group-hover:text-primary transition-colors" />
                  Copy ID
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={downloadInvoice}
                  className="w-full rounded-2xl h-12 flex gap-2 font-bold border-2 transition-all hover:bg-primary/5 hover:border-primary/40 hover:text-primary group"
                >
                  <FileText className="w-4 h-4 group-hover:text-primary transition-colors" />
                  Invoice
                </Button>
              </motion.div>
            </div>

            <motion.div 
              className="w-full"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                onClick={onClose}
                className="w-full rounded-2xl h-14 text-lg font-bold bg-primary text-primary-foreground shadow-2xl shadow-primary/25 hover:bg-primary/90 transition-all"
              >
                Continue to Site
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessModal;
