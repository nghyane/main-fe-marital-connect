import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bricolageFont } from "@/utils/fonts";
import Link from "next/link";
import { Expert } from "@/types/expert";
import { Badge } from "@/components/ui/badge";

interface ExpertCardProps {
  expert: Expert;
}

const STATUS_STYLES = {
  online: "bg-green-100 text-green-800",
  offline: "bg-gray-100 text-gray-800",
  away: "bg-yellow-100 text-yellow-800",
} as const;

export const ExpertCard = ({ expert }: ExpertCardProps) => {
  const {
    id,
    user,
    title,
    about,
    experience,
    location,
    availability_status,
    specialties,
    services,
  } = expert;

  const lowestPrice = Math.min(...services.map(service => service.price));

  return (
    <Link href={`/experts/${id}`}>
      <Card className="border border-gray-200 shadow-none hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row items-start p-6 gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/30 overflow-hidden ring-2 ring-primary/20" />
          </div>

          <div className="flex-grow space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`${bricolageFont.className} text-xl font-semibold text-primary`}>
                  {user.name}
                </h3>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${STATUS_STYLES[availability_status]}`}>
                  {availability_status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {title} • {experience} years exp. • {location}
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {about}
            </p>

            <div className="flex flex-wrap gap-2">
              {specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">${lowestPrice}</span> / session
              </div>
              <Button
                size="sm"
                className="rounded-full px-6 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}; 