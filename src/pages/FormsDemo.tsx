import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganizationForm from "./forms/OrganizationForm";
import UserForm from "./forms/UserForm";
import TicketForm from "./forms/TicketForm";
import MockDataService from "@/services/mockDataService";

export default function FormsDemo() {
  const [currentView, setCurrentView] = useState<string>("list");
  const [editingId, setEditingId] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState("organizations");

  const organizations = MockDataService.getOrganizations();
  const users = MockDataService.getUsers();
  const tickets = MockDataService.getTickets();

  const handleSuccess = () => {
    setCurrentView("list");
    setEditingId(undefined);
    // Force re-render by updating state
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setCurrentView("edit");
  };

  const handleDelete = (
    type: "organization" | "user" | "ticket",
    id: string
  ) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "organization") {
        MockDataService.deleteOrganization(id);
      } else if (type === "user") {
        MockDataService.deleteUser(id);
      } else if (type === "ticket") {
        MockDataService.deleteTicket(id);
      }
      // Force re-render
      setCurrentView("list");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">CRUD Forms Demo</h1>
        <p className="text-gray-600 mt-2">
          Complete CRUD operations for Organizations, Users, and Tickets
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>

        {/* Organizations Tab */}
        <TabsContent value="organizations">
          {currentView === "list" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Organizations</CardTitle>
                  <CardDescription>
                    Manage organizations in the system
                  </CardDescription>
                </div>
                <Button onClick={() => setCurrentView("create")}>
                  Create Organization
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organizations.map((org) => (
                    <div
                      key={org.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{org.name}</h3>
                        <p className="text-sm text-gray-600">
                          {org.shortName} • {org.address}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            org.active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {org.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(org.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete("organization", org.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentView === "create" && (
            <OrganizationForm
              mode="create"
              onSuccess={handleSuccess}
              onCancel={() => setCurrentView("list")}
            />
          )}

          {currentView === "edit" && editingId && (
            <OrganizationForm
              mode="edit"
              organizationId={editingId}
              onSuccess={handleSuccess}
              onCancel={() => setCurrentView("list")}
            />
          )}
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          {currentView === "list" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Manage users in the system</CardDescription>
                </div>
                <Button onClick={() => setCurrentView("create")}>
                  Create User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => {
                    const org = user.organizationId
                      ? organizations.find((o) => o.id === user.organizationId)
                      : null;
                    return (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                              {user.role.replace("_", " ")}
                            </span>
                            {org && (
                              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                                {org.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(user.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete("user", user.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {currentView === "create" && (
            <UserForm
              mode="create"
              onSuccess={handleSuccess}
              onCancel={() => setCurrentView("list")}
            />
          )}

          {currentView === "edit" && editingId && (
            <UserForm
              mode="edit"
              userId={editingId}
              onSuccess={handleSuccess}
              onCancel={() => setCurrentView("list")}
            />
          )}
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets">
          {currentView === "list" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tickets</CardTitle>
                  <CardDescription>Manage support tickets</CardDescription>
                </div>
                <Button onClick={() => setCurrentView("create")}>
                  Create Ticket
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => {
                    const org = organizations.find(
                      (o) => o.id === ticket.organizationId
                    );
                    const assignee = users.find(
                      (u) => u.id === ticket.assignedTo
                    );
                    const creator = users.find(
                      (u) => u.id === ticket.createdBy
                    );

                    return (
                      <div
                        key={ticket.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold">{ticket.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {ticket.description}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                ticket.status === "OPEN"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : ticket.status === "IN_PROGRESS"
                                  ? "bg-blue-100 text-blue-800"
                                  : ticket.status === "RESOLVED"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {ticket.status.replace("_", " ")}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                ticket.priority === "URGENT"
                                  ? "bg-red-100 text-red-800"
                                  : ticket.priority === "HIGH"
                                  ? "bg-orange-100 text-orange-800"
                                  : ticket.priority === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {ticket.priority}
                            </span>
                            {org && (
                              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                                {org.name}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Created by: {creator?.name || "Unknown"}
                            {assignee && ` • Assigned to: ${assignee.name}`}
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(ticket.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete("ticket", ticket.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {currentView === "create" && (
            <TicketForm
              mode="create"
              onSuccess={handleSuccess}
              onCancel={() => setCurrentView("list")}
            />
          )}

          {currentView === "edit" && editingId && (
            <TicketForm
              mode="edit"
              ticketId={editingId}
              onSuccess={handleSuccess}
              onCancel={() => setCurrentView("list")}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
