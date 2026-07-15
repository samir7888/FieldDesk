import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
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
import {
  type ITicket,
  type TicketStatus,
  type TicketPriority,
} from "@/types/type";
import MockDataService from "@/services/mockDataService";
import { useState, useEffect, useMemo } from "react";
import { ticketService, userService } from "@/services";

// Validation schema
const ticketSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"] as const),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"] as const),
  organizationId: z.string().min(1, "Please select an organization"),
  assignedTo: z.string().optional(),
  createdBy: z.string().min(1, "Please select who created this ticket"),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  mode: "create" | "edit";
  ticketId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const statusOptions: { value: TicketStatus; label: string }[] = [
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
];

const priorityOptions: {
  value: TicketPriority;
  label: string;
  color: string;
}[] = [
  { value: "LOW", label: "Low", color: "text-green-600" },
  { value: "MEDIUM", label: "Medium", color: "text-yellow-600" },
  { value: "HIGH", label: "High", color: "text-orange-600" },
  { value: "URGENT", label: "Urgent", color: "text-red-600" },
];

export default function TicketForm({
  mode,
  ticketId,
  onSuccess,
  onCancel,
}: TicketFormProps) {
  const params = useParams();
  const navigate = useNavigate();
  const ticketIdFromUrl = ticketId || params.id;

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "OPEN",
      priority: "MEDIUM",
      organizationId: "",
      assignedTo: "",
      createdBy: "",
    },
  });

  const selectedOrganizationId = form.watch("organizationId");

  // Filter users based on selected organization
  const availableUsers = useMemo(() => {
    if (!selectedOrganizationId) return [];
    return MockDataService.getUsers().filter(
      (user) =>
        user.organizationId === selectedOrganizationId ||
        ["SUPER_ADMIN", "AUDITOR"].includes(user.role)
    );
  }, [selectedOrganizationId]);

  // Filter agents for assignment (excluding super admin and auditor for assignment)
  const availableAgents = useMemo(() => {
    return availableUsers.filter(
      (user) => !["SUPER_ADMIN", "AUDITOR"].includes(user.role)
    );
  }, [availableUsers]);

  const LoadTicketData = async () => {
    if (mode === "edit" && ticketIdFromUrl) {
      const ticket = await ticketService.getById(ticketIdFromUrl);
      if (ticket) {
        form.reset({
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          priority: ticket.priority,
          organizationId: ticket.organizationId,
          assignedTo: ticket.assignedTo,
          createdBy: ticket.createdBy,
        });
      }
    }
  };

  // Load ticket data for edit mode
  useEffect(() => {
    LoadTicketData();
  }, [mode, ticketIdFromUrl, form]);

  // Clear assigned users when organization changes
  useEffect(() => {
    if (mode === "create") {
      form.setValue("assignedTo", "");
      form.setValue("createdBy", "");
    }
  }, [selectedOrganizationId, form, mode]);

  const onSubmit = (data: TicketFormData) => {
    if (mode === "create") {
      MockDataService.createTicket({
        ...data,
        assignedTo: data.assignedTo || "",
      });
    } else if (mode === "edit" && ticketIdFromUrl) {
      MockDataService.updateTicket(ticketIdFromUrl, {
        ...data,
        assignedTo: data.assignedTo || "",
      });
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
          {mode === "create" ? "Create Ticket" : "Edit Ticket"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Create a new support ticket"
            : "Update ticket details"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ticket title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issue in detail"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorityOptions.map((priority) => (
                          <SelectItem
                            key={priority.value}
                            value={priority.value}
                          >
                            <span className={priority.color}>
                              {priority.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

           
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {mode === "create" ? "Create" : "Update"} Ticket
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
