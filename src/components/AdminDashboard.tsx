import { useState, useEffect } from 'react';
import { Calendar, Clock, User, MessageSquare, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, Conversation, Appointment } from '../lib/supabase';

export default function AdminDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [conversationsRes, appointmentsRes] = await Promise.all([
        supabase
          .from('conversations')
          .select(`
            *,
            customers (
              name,
              email,
              phone
            ),
            conversation_messages (
              id,
              role,
              content,
              confidence_score,
              created_at
            )
          `)
          .order('started_at', { ascending: false })
          .limit(20),
        supabase
          .from('appointments')
          .select(`
            *,
            customers (
              name,
              email,
              phone
            )
          `)
          .order('created_at', { ascending: false })
          .limit(20),
      ]);

      if (conversationsRes.data) {
        setConversations(conversationsRes.data as Conversation[]);
      }
      if (appointmentsRes.data) {
        setAppointments(appointmentsRes.data as Appointment[]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'active':
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'active':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor conversations and appointments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{conversations.length}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-blue-600 opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{appointments.length}</p>
              </div>
              <Calendar className="w-12 h-12 text-green-600 opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {conversations.filter(c => c.status === 'active').length}
                </p>
              </div>
              <AlertCircle className="w-12 h-12 text-yellow-600 opacity-80" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Conversations</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {conversations.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No conversations yet</div>
              ) : (
                conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className="w-full p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(conversation.status)}
                          <span className="font-medium text-gray-900">
                            {conversation.customers?.name || 'Anonymous'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                            {conversation.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Type: {conversation.conversation_type}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(conversation.started_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {conversation.conversation_messages?.length || 0} messages
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {appointments.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No appointments yet</div>
              ) : (
                appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(appointment.status)}
                          <span className="font-medium text-gray-900">
                            {appointment.customers?.name || 'Unknown'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(appointment.appointment_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {new Date(appointment.appointment_date).toLocaleTimeString()}
                          </div>
                          <p className="text-sm text-gray-600">Service: {appointment.service_type}</p>
                          {appointment.customers?.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <User className="w-4 h-4" />
                              {appointment.customers.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {selectedConversation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Conversation Details</h3>
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="mb-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Customer:</span>{' '}
                    {selectedConversation.customers?.name || 'Anonymous'}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{' '}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedConversation.status)}`}>
                      {selectedConversation.status}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Started:</span>{' '}
                    {new Date(selectedConversation.started_at).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Messages:</h4>
                  {selectedConversation.conversation_messages
                    ?.filter(msg => msg.role !== 'system')
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-100 ml-8'
                            : 'bg-gray-100 mr-8'
                        }`}
                      >
                        <p className="text-xs font-medium text-gray-600 mb-1">
                          {message.role === 'user' ? 'Customer' : 'Assistant'}
                        </p>
                        <p className="text-sm text-gray-800">{message.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
