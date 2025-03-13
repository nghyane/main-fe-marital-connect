'use client';

import { memo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, GraduationCap, MessageCircle, Award, StarIcon } from "lucide-react";
import { bricolageFont } from "@/utils/fonts";
import { useExpert } from '../context';


export const ExpertTabs = memo(function ExpertTabs() {
    const { about, specialties, education, certifications } = useExpert();

    return (
        <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="about" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    About
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Education
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Reviews
                </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
                <Card>
                    <CardContent className="p-6">
                        <h2 className={`${bricolageFont.className} text-xl font-semibold mb-4`}>About</h2>
                        <p className="text-muted-foreground leading-relaxed">{about}</p>
                        
                        <Separator className="my-6" />
                        
                        <h2 className={`${bricolageFont.className} text-xl font-semibold mb-4`}>Specialties</h2>
                        <div className="flex flex-wrap gap-2">
                            {specialties.map((specialty, index) => (
                                <span 
                                    key={index}
                                    className="px-3 py-1 bg-primary/5 text-primary rounded-full text-sm"
                                >
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="education">
                <Card>
                    <CardContent className="p-6 space-y-6">
                        <div>
                            <h2 className={`${bricolageFont.className} text-xl font-semibold mb-4 flex items-center gap-2`}>
                                <GraduationCap className="w-5 h-5" />
                                Education
                            </h2>
                            <ul className="space-y-4">
                                {education.map((edu) => (
                                    <li key={edu.id} className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary/60 mt-2" />
                                        <span className="text-muted-foreground">
                                            {edu.degree} - {edu.institution} ({edu.year})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Separator />

                        <div>
                            <h2 className={`${bricolageFont.className} text-xl font-semibold mb-4 flex items-center gap-2`}>
                                <Award className="w-5 h-5" />
                                Certifications
                            </h2>
                            <ul className="space-y-4">
                                {certifications.map((cert) => (
                                    <li key={cert.id} className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary/60 mt-2" />
                                        <span className="text-muted-foreground">
                                            {cert.name} - {cert.issuer} ({cert.year})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="reviews">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center text-muted-foreground py-8">
                            No reviews yet
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}); 