
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Mail, MessageSquare, CheckCircle, Shield, Phone, Car } from "lucide-react";
import { FormData } from "@/pages/Index";

interface QuoteResultProps {
  formData: FormData;
  prevStep: () => void;
}

const QuoteResult = ({ formData, prevStep }: QuoteResultProps) => {
  // Calculate premium based on form data
  const calculatePremium = () => {
    let basePremium = 0;
    
    // Base premium calculation (adjusted for ZMK)
    if (formData.insuranceType === "Third Party") {
      basePremium = 2500;
    } else if (formData.insuranceType === "Comprehensive") {
      basePremium = 8500;
      
      // Add percentage based on vehicle value for comprehensive
      const vehicleValue = parseInt(formData.vehicleValue.replace(/[K,]/g, '')) || 0;
      if (vehicleValue > 0) {
        basePremium = Math.max(basePremium, vehicleValue * 0.05); // 5% of vehicle value
      }
    }

    // Add-on costs (adjusted for ZMK)
    const addonCosts = {
      roadside: 1000,
      theft: 1750,
      windscreen: 700,
      flood: 1400,
      enhanced: 850
    };

    let addonTotal = 0;
    if (formData.addons) {
      formData.addons.forEach(addon => {
        addonTotal += addonCosts[addon as keyof typeof addonCosts] || 0;
      });
    }

    return {
      basePremium,
      addonTotal,
      total: basePremium + addonTotal
    };
  };

  const premium = calculatePremium();
  const quoteNumber = `MIQ-${Date.now().toString().slice(-6)}`;

  const addonNames = {
    roadside: { name: "Roadside Assistance", price: 1000 },
    theft: { name: "Theft Protection", price: 1750 },
    windscreen: { name: "Windscreen Protection", price: 700 },
    flood: { name: "Flood & Natural Disaster", price: 1400 },
    enhanced: { name: "Enhanced Third Party", price: 850 }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMK',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-800 mb-2">Quote Generated Successfully!</h2>
        <p className="text-green-700">Your motor insurance quote is ready. Quote valid for 30 days.</p>
        <p className="text-sm text-green-600 mt-2">Quote Reference: <span className="font-semibold">{quoteNumber}</span></p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quote Details */}
        <div className="lg:col-span-2">
          <Card className="p-8 shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Insurance Quote</h3>
              <p className="text-gray-600">Premium breakdown for {formData.make} {formData.model} ({formData.year})</p>
            </div>

            <div className="space-y-6">
              {/* Base Coverage */}
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{formData.insuranceType} Insurance</h4>
                    <p className="text-sm text-gray-600">
                      {formData.insuranceType === "Third Party" 
                        ? "Legal minimum coverage for third-party damages" 
                        : "Comprehensive coverage for your vehicle and third-party"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(premium.basePremium)}</p>
                </div>
              </div>

              {/* Add-ons */}
              {formData.addons && formData.addons.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Additional Coverage</h4>
                    {formData.addons.map((addon) => {
                      const addonInfo = addonNames[addon as keyof typeof addonNames];
                      return (
                        <div key={addon} className="flex justify-between items-center py-2">
                          <span className="text-gray-700">{addonInfo.name}</span>
                          <span className="font-medium">{formatCurrency(addonInfo.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <Separator />

              {/* Total */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Total Annual Premium</h4>
                    <p className="text-sm text-gray-600">Payable annually or in installments</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(premium.total)}</p>
                    <p className="text-sm text-gray-600">per year</p>
                  </div>
                </div>
              </div>

              {/* Monthly Payment Option */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Monthly Payment Option:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(Math.ceil(premium.total / 12))}/month</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">*Includes processing fees</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          {/* Download & Share */}
          <Card className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Get Your Quote</h4>
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Quote
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Email Quote
              </Button>
              <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send via SMS
              </Button>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Ready to Purchase?</h4>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white mb-4">
              Proceed to Buy
            </Button>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Instant policy issuance
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Digital certificate
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                24/7 claim support
              </div>
            </div>
          </Card>

          {/* Contact Support */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
            <p className="text-sm text-blue-700 mb-4">Our insurance experts are ready to assist you.</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                +260 (0) 21 123 4567
              </div>
              <div className="flex items-center text-sm text-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                support@motorinsure.zm
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button 
          onClick={prevStep}
          variant="outline"
          className="px-8"
        >
          Back to Review
        </Button>
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
          className="px-8"
        >
          New Quote
        </Button>
      </div>
    </div>
  );
};

export default QuoteResult;
