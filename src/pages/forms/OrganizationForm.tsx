import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { type IOrganization } from "@/mock/organizations";
import MockDataService from "@/services/mockDataService";
import { useState, useEffect } from "react";

// Validation schema
const organizationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  shortName: z.string().min(2, "Short name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  active: z.boolean(),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

interface OrganizationFormProps {
  mode: "create" | "edit";
  organizationId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function OrganizationForm({
  mode,
  organizationId,
  onSuccess,
  onCancel,
}: OrganizationFormProps) {
  const params = useParams();
  const navigate = useNavigate();
  const orgId = organizationId || params.id;

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      shortName: "",
      address: "",
      active: true,
    },
  });

  // Load organization data for edit mode
  useEffect(() => {
    if (mode === "edit" && orgId) {
      const org = MockDataService.getOrganizationById(orgId);
      if (org) {
        form.reset({
          name: org.name,
          shortName: org.shortName,
          address: org.address,
          active: org.active,
        });
      }
    }
  }, [mode, orgId, form]);

  const onSubmit = (data: OrganizationFormData) => {
    if (mode === "create") {
      MockDataService.createOrganization(data);
    } else if (mode === "edit" && orgId) {
      MockDataService.updateOrganization(orgId, data);
    }

    form.reset();

    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/dashboard");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Create Organization" : "Edit Organization"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Add a new organization to the system"
            : "Update organization details"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter short name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter organization address"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                {...form.register("active")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="active"
                className="text-sm font-medium text-gray-700"
              >
                Active
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {mode === "create" ? "Create" : "Update"} Organization
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
