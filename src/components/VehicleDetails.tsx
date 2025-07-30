
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Calendar, Gauge, DollarSign } from "lucide-react";
import { FormData } from "@/pages/Index";

interface VehicleDetailsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const VehicleDetails = ({ formData, updateFormData, nextStep, prevStep }: VehicleDetailsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.make) newErrors.make = "Vehicle make is required";
    if (!formData.model.trim()) newErrors.model = "Vehicle model is required";
    if (!formData.year) newErrors.year = "Year of manufacture is required";
    if (!formData.engineCapacity.trim()) newErrors.engineCapacity = "Engine capacity is required";
    if (!formData.vehicleType) newErrors.vehicleType = "Vehicle type is required";
    if (!formData.vehicleValue.trim()) newErrors.vehicleValue = "Vehicle value is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  const carMakes = [
    "Toyota", "Honda", "Nissan", "Hyundai", "Kia", "Mercedes-Benz", "BMW", "Audi", 
    "Volkswagen", "Ford", "Chevrolet", "Peugeot", "Mazda", "Lexus", "Infiniti", "Acura"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 shadow-lg">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Details</h3>
          <p className="text-gray-600">Tell us about the vehicle you want to insure.</p>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Car className="w-4 h-4 mr-2 text-gray-500" />
                Vehicle Make *
              </Label>
              <Select value={formData.make} onValueChange={(value) => updateFormData({ make: value })}>
                <SelectTrigger className={errors.make ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {carMakes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
            </div>

            <div>
              <Label htmlFor="model" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Car className="w-4 h-4 mr-2 text-gray-500" />
                Model *
              </Label>
              <Input
                id="model"
                placeholder="e.g., Corolla, Camry, Civic"
                value={formData.model}
                onChange={(e) => updateFormData({ model: e.target.value })}
                className={errors.model ? "border-red-500" : ""}
              />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Year of Manufacture *
              </Label>
              <Select value={formData.year} onValueChange={(value) => updateFormData({ year: value })}>
                <SelectTrigger className={errors.year ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
            </div>

            <div>
              <Label htmlFor="engineCapacity" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Gauge className="w-4 h-4 mr-2 text-gray-500" />
                Engine Capacity *
              </Label>
              <Input
                id="engineCapacity"
                placeholder="e.g., 1.8L, 2.0L, 2.5L"
                value={formData.engineCapacity}
                onChange={(e) => updateFormData({ engineCapacity: e.target.value })}
                className={errors.engineCapacity ? "border-red-500" : ""}
              />
              {errors.engineCapacity && <p className="text-red-500 text-sm mt-1">{errors.engineCapacity}</p>}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Car className="w-4 h-4 mr-2 text-gray-500" />
              Vehicle Type *
            </Label>
            <Select value={formData.vehicleType} onValueChange={(value) => updateFormData({ vehicleType: value })}>
              <SelectTrigger className={errors.vehicleType ? "border-red-500" : ""}>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Private">Private Use</SelectItem>
                <SelectItem value="Commercial">Commercial Use</SelectItem>
              </SelectContent>
            </Select>
            {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>}
          </div>

          <div>
            <Label htmlFor="vehicleValue" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
              Vehicle Value (Estimated Market Value) *
            </Label>
            <Input
              id="vehicleValue"
              placeholder="e.g., ZMK 150,000"
              value={formData.vehicleValue}
              onChange={(e) => updateFormData({ vehicleValue: e.target.value })}
              className={errors.vehicleValue ? "border-red-500" : ""}
            />
            {errors.vehicleValue && <p className="text-red-500 text-sm mt-1">{errors.vehicleValue}</p>}
            <p className="text-sm text-gray-500 mt-1">Enter the current market value of your vehicle in Zambian Kwacha</p>
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

export default VehicleDetails;
