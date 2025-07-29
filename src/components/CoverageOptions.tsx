
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Wrench, AlertTriangle, Car, Phone, Users } from "lucide-react";
import { FormData } from "@/pages/Index";

interface CoverageOptionsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const CoverageOptions = ({ formData, updateFormData, nextStep, prevStep }: CoverageOptionsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.insuranceType) {
      newErrors.insuranceType = "Please select an insurance type";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const handleInsuranceTypeChange = (type: string) => {
    updateFormData({ insuranceType: type });
  };

  const handleAddonChange = (addon: string, checked: boolean) => {
    const currentAddons = formData.addons || [];
    if (checked) {
      updateFormData({ addons: [...currentAddons, addon] });
    } else {
      updateFormData({ addons: currentAddons.filter(a => a !== addon) });
    }
  };

  const addons = [
    {
      id: "roadside",
      name: "Roadside Assistance",
      description: "24/7 emergency roadside support, towing, and breakdown services",
      icon: Phone,
      price: "₦15,000"
    },
    {
      id: "theft",
      name: "Theft Protection",
      description: "Enhanced coverage against vehicle theft and hijacking",
      icon: Shield,
      price: "₦25,000"
    },
    {
      id: "windscreen",
      name: "Windscreen Protection",
      description: "Coverage for windscreen and window glass replacement",
      icon: Car,
      price: "₦10,000"
    },
    {
      id: "flood",
      name: "Flood & Natural Disaster",
      description: "Protection against flood, earthquake, and natural disasters",
      icon: AlertTriangle,
      price: "₦20,000"
    },
    {
      id: "enhanced",
      name: "Enhanced Third Party",
      description: "Increased third party liability limits and coverage",
      icon: Users,
      price: "₦12,000"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 shadow-lg">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Coverage Options</h3>
          <p className="text-gray-600">Choose the type of insurance and additional coverage options.</p>
        </div>

        <div className="space-y-8">
          {/* Insurance Type */}
          <div>
            <Label className="text-lg font-medium text-gray-900 mb-4 block">
              Insurance Type *
            </Label>
            <div className="grid md:grid-cols-2 gap-4">
              <Card 
                className={`p-6 cursor-pointer border-2 transition-all duration-200 hover:shadow-md ${
                  formData.insuranceType === "Third Party" 
                    ? "border-blue-600 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleInsuranceTypeChange("Third Party")}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Users className="w-8 h-8 text-blue-600 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-2">Third Party</h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Covers damages to other people and their property. Required by law.
                    </p>
                    <div className="text-blue-600 font-bold">Starting from ₦35,000</div>
                  </div>
                </div>
              </Card>

              <Card 
                className={`p-6 cursor-pointer border-2 transition-all duration-200 hover:shadow-md ${
                  formData.insuranceType === "Comprehensive" 
                    ? "border-blue-600 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleInsuranceTypeChange("Comprehensive")}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Shield className="w-8 h-8 text-blue-600 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-2">Comprehensive</h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Full protection for your vehicle and third-party damages.
                    </p>
                    <div className="text-blue-600 font-bold">Starting from ₦125,000</div>
                  </div>
                </div>
              </Card>
            </div>
            {errors.insuranceType && <p className="text-red-500 text-sm mt-2">{errors.insuranceType}</p>}
          </div>

          {/* Add-ons */}
          <div>
            <Label className="text-lg font-medium text-gray-900 mb-4 block">
              Additional Coverage (Optional)
            </Label>
            <div className="grid md:grid-cols-2 gap-4">
              {addons.map((addon) => {
                const Icon = addon.icon;
                const isChecked = formData.addons?.includes(addon.id) || false;
                
                return (
                  <Card key={addon.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        id={addon.id}
                        checked={isChecked}
                        onCheckedChange={(checked) => handleAddonChange(addon.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Icon className="w-5 h-5 text-blue-600 mr-2" />
                          <Label 
                            htmlFor={addon.id}
                            className="font-medium cursor-pointer"
                          >
                            {addon.name}
                          </Label>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{addon.description}</p>
                        <div className="text-blue-600 font-semibold text-sm">{addon.price}/year</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            onClick={prevStep}
            variant="outline"
            className="px-8"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CoverageOptions;
