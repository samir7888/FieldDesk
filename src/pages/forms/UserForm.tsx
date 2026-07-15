import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type IUser, type Role } from "@/types/type";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { userService } from "@/services";
import { useSession } from "@/hooks/useSesstion";

// Validation schema
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum([
    "SUPER_ADMIN",
    "AUDITOR",
    "ORG_ADMIN",
    "TEAM_LEAD",
    "AGENT",
  ] as const),
  organizationId: z.string().nullable().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  mode: "create" | "edit";
  userId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const roleOptions: { value: Role; label: string }[] = [
  { value: "ORG_ADMIN", label: "Organization Admin" },
  { value: "TEAM_LEAD", label: "Team Lead" },
  { value: "AGENT", label: "Agent" },
];

export default function UserForm({
  mode,
  userId,
  onSuccess,
  onCancel,
}: UserFormProps) {
  const params = useParams();
  const navigate = useNavigate();
  const userIdFromUrl = userId || params.id;
  const { currentUser } = useSession();
  if (!currentUser) {
    return null;
  }

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "AGENT",
      organizationId: null,
    },
  });

  const selectedRole = form.watch("role");
  const requiresOrganization = ["ORG_ADMIN", "TEAM_LEAD", "AGENT"].includes(
    selectedRole
  );

  const loadData = async () => {
    if (mode === "edit" && userIdFromUrl) {
      const user = await userService.getById(userIdFromUrl);
      if (user) {
        form.reset({
          name: user.name,
          email: user.email,
          role: user.role,
          organizationId: user.organizationId,
        });
      }
    }
  };

  // Load user data for edit mode
  useEffect(() => {
    loadData();
  }, [mode, userIdFromUrl, form]);

  // Clear organizationId when role doesn't require it
  useEffect(() => {
    if (!requiresOrganization) {
      form.setValue("organizationId", null);
    }
  }, [requiresOrganization, form]);

  const onSubmit = (data: UserFormData) => {
    if (mode === "create") {
      userService.createUser(
        {
          ...data,
          organizationId: requiresOrganization
            ? data.organizationId || null
            : null,
        },
        currentUser?.organizationId || ""
      );
    } else if (mode === "edit" && userIdFromUrl) {
      userService.updateUserById(
        userIdFromUrl,
        {
          ...data,
          organizationId: requiresOrganization
            ? data.organizationId || null
            : null,
        },
        currentUser.organizationId || ""
      );
    }

    form.reset();

    if (onSuccess) {
      onSuccess();
    } else {
      navigate(-1);
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
        <CardTitle>{mode === "create" ? "Create User" : "Edit User"}</CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Add a new user to the system"
            : "Update user details"}
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
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* {requiresOrganization && (
              <FormField
                control={form.control}
                name="organizationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an organization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userSer.getOrganizations().map((org) => (
                          <SelectItem key={org.id} value={org.id}>
                            {org.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )} */}

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {mode === "create" ? "Create" : "Update"} User
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
