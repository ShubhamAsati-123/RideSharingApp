import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const faqs = [
  {
    question: "How do I book a ride?",
    answer:
      "You can book a ride through our mobile app or website. Simply enter your pickup location and destination, choose your preferred ride type, and confirm your booking.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, debit cards, and digital wallets. You can manage your payment methods in the app settings.",
  },
  {
    question: "How do I become a driver?",
    answer:
      "To become a driver, you need to sign up through our driver portal, submit required documentation, pass a background check, and complete our onboarding process.",
  },
  {
    question: "What if I left something in the car?",
    answer:
      "If you've left something in a vehicle, you can report it through the app or contact our support team. We'll help coordinate with the driver to retrieve your items.",
  },
];

export default function Support() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions or get in touch with our support
          team.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>24/7 Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our support team is available around the clock to assist you.
            </p>
            <Button className="w-full">Contact Support</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Help Center</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Browse our knowledge base for detailed guides and tutorials.
            </p>
            <Button variant="outline" className="w-full">
              Visit Help Center
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Connect with other users and share experiences.
            </p>
            <Button variant="outline" className="w-full">
              Join Community
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help?" />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
        <p className="text-muted-foreground mb-6">
          Our support team is just a click away. We typically respond within 24
          hours.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline">Live Chat</Button>
          <Button variant="outline">Email Support</Button>
        </div>
      </div>
    </div>
  );
}
