
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Car, Shield, Edit } from "lucide-react";
import { FormData } from "@/pages/Index";

interface ReviewConfirmProps {
  formData: FormData;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

const ReviewConfirm = ({ formData, nextStep, prevStep, goToStep }: ReviewConfirmProps) => {
  const addonNames = {
    roadside: "Roadside Assistance",
    theft: "Theft Protection", 
    windscreen: "Windscreen Protection",
    flood: "Flood & Natural Disaster",
    enhanced: "Enhanced Third Party"
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 shadow-lg">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h3>
          <p className="text-gray-600">Please review your information before getting your quote.</p>
        </div>

        <div className="space-y-8">
          {/* Personal Information */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h4>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => goToStep(1)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Full Name:</span>
                <p className="text-gray-900">{formData.fullName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <p className="text-gray-900">{formData.phone}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <p className="text-gray-900">{formData.email}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Location:</span>
                <p className="text-gray-900">{formData.location}</p>
              </div>
              {formData.nationalId && (
                <div>
                  <span className="font-medium text-gray-700">National ID:</span>
                  <p className="text-gray-900">{formData.nationalId}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Vehicle Details */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold flex items-center">
                <Car className="w-5 h-5 mr-2 text-blue-600" />
                Vehicle Details
              </h4>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => goToStep(2)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Make & Model:</span>
                <p className="text-gray-900">{formData.make} {formData.model}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Year:</span>
                <p className="text-gray-900">{formData.year}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Engine Capacity:</span>
                <p className="text-gray-900">{formData.engineCapacity}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Vehicle Type:</span>
                <p className="text-gray-900">{formData.vehicleType}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Vehicle Value:</span>
                <p className="text-gray-900">{formData.vehicleValue}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Coverage Options */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Coverage Options
              </h4>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => goToStep(3)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
            <div className="text-sm">
              <div className="mb-3">
                <span className="font-medium text-gray-700">Insurance Type:</span>
                <p className="text-gray-900">{formData.insuranceType}</p>
              </div>
              {formData.addons && formData.addons.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Add-ons:</span>
                  <ul className="text-gray-900 mt-1">
                    {formData.addons.map((addon) => (
                      <li key={addon} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {addonNames[addon as keyof typeof addonNames]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            onClick={nextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Get My Quote
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReviewConfirm;
