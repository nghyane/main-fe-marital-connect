"use client";

import { SearchIcon, MapPinIcon } from "lucide-react";
import { bricolageFont } from "@/utils/fonts";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ExpertSearchParams } from "@/types/search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  { value: "venue", label: "Wedding Venue" },
  { value: "photo", label: "Photography" },
  { value: "dress", label: "Wedding Dress" },
];

const BUDGETS = [
  { value: "budget1", label: "Under $1000" },
  { value: "budget2", label: "$1000 - $5000" },
  { value: "budget3", label: "Above $5000" },
];

export const SearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formValues, setFormValues] = useState<ExpertSearchParams>({
    name: searchParams.get("name") || "",
    location: searchParams.get("location") || "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      
      if (formValues.name) {
        params.set("name", formValues.name);
      }
      if (formValues.location) {
        params.set("location", formValues.location);
      }

      router.push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [formValues, router]);

  const handleNameChange = useCallback((value: string) => {
    setFormValues(prev => ({ ...prev, name: value }));
  }, []);

  const handleLocationChange = useCallback((value: string) => {
    setFormValues(prev => ({ ...prev, location: value }));
  }, []);

  return (
    <div className="border border-dashed border-gray-200 bg-gray-50 rounded-lg p-6">
      <form className="flex flex-col lg:flex-row gap-3 lg:gap-28" onSubmit={e => e.preventDefault()}>
        <div className={`${bricolageFont.className} flex-1 grid grid-cols-3 gap-4`}>
          <div className="w-full relative">
            <Input
              type="text"
              placeholder="Enter location..."
              value={formValues.location}
              onChange={e => handleLocationChange(e.target.value)}
              className="h-12 text-base rounded-md pl-10 pr-4 placeholder:text-gray-400 bg-white border border-gray-200"
            />
            <MapPinIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
          </div>

          <div className="w-full">
            <Select>
              <SelectTrigger className="bg-white px-4 h-12 text-base text-black border border-gray-200 rounded-md">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="text-base">
                <SelectGroup>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Select>
              <SelectTrigger className="bg-white px-4 h-12 text-base text-black border border-gray-200 rounded-md">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent className="text-base">
                <SelectGroup>
                  {BUDGETS.map(budget => (
                    <SelectItem key={budget.value} value={budget.value}>
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full lg:w-1/4 relative">
          <Input
            type="text"
            placeholder="Search by name..."
            value={formValues.name}
            onChange={e => handleNameChange(e.target.value)}
            className="h-12 text-base rounded-md pl-10 pr-4 placeholder:text-gray-400 bg-white border border-gray-200"
          />
          <SearchIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
        </div>
      </form>
    </div>
  );
}; 