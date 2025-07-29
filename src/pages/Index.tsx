
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Car, Clock, CheckCircle } from "lucide-react";
import PersonalInfo from "@/components/PersonalInfo";
import VehicleDetails from "@/components/VehicleDetails";
import CoverageOptions from "@/components/CoverageOptions";
import ReviewConfirm from "@/components/ReviewConfirm";
import QuoteResult from "@/components/QuoteResult";

export interface FormData {
  // Personal Information
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  location: string;
  
  // Vehicle Details
  make: string;
  model: string;
  year: string;
  engineCapacity: string;
  vehicleType: string;
  vehicleValue: string;
  
  // Coverage Options
  insuranceType: string;
  addons: string[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    nationalId: "",
    location: "",
    make: "",
    model: "",
    year: "",
    engineCapacity: "",
    vehicleType: "",
    vehicleValue: "",
    insuranceType: "",
    addons: []
  });

  const steps = [
    "Personal Information",
    "Vehicle Details", 
    "Coverage Options",
    "Review & Confirm",
    "Your Quote"
  ];

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderHomepage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get Your Motor Insurance Quote in 
            <span className="text-blue-600"> Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Protect your vehicle with comprehensive coverage. Fast, reliable, and affordable insurance tailored to your needs.
          </p>
          <Button 
            onClick={() => setCurrentStep(1)}
            size="lg"
            className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get a Quote Now
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Comprehensive Coverage</h3>
            <p className="text-gray-600">Full protection for your vehicle including theft, accident, and third-party coverage.</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quick & Easy Process</h3>
            <p className="text-gray-600">Get your quote in under 5 minutes with our streamlined application process.</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Instant Approval</h3>
            <p className="text-gray-600">Receive your quote immediately and download your policy documents instantly.</p>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 2:
        return <VehicleDetails formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <CoverageOptions formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <ReviewConfirm formData={formData} nextStep={nextStep} prevStep={prevStep} goToStep={goToStep} />;
      case 5:
        return <QuoteResult formData={formData} prevStep={prevStep} />;
      default:
        return renderHomepage();
    }
  };

  if (currentStep === 0) {
    return renderHomepage();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.slice(1).map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : index + 1 === currentStep 
                      ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                {index < steps.slice(1).length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep]}</h2>
            <p className="text-gray-600 mt-1">Step {currentStep} of {steps.length - 1}</p>
          </div>
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
};

export default Index;
