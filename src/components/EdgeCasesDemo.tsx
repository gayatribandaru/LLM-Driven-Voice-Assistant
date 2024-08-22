import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Book, Loader2 } from 'lucide-react';
import { supabase, EdgeCase } from '../lib/supabase';

export default function EdgeCasesDemo() {
  const [edgeCases, setEdgeCases] = useState<EdgeCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<EdgeCase | null>(null);

  useEffect(() => {
    fetchEdgeCases();
  }, []);

  const fetchEdgeCases = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('edge_cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEdgeCases(data || []);
    } catch (error) {
      console.error('Error fetching edge cases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading edge cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Book className="w-8 h-8 text-blue-600" />
            Edge Cases Documentation
          </h1>
          <p className="text-gray-600 mt-2">
            Documented scenarios and handling strategies for voice assistant interactions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {edgeCases.map((edgeCase) => (
            <div
              key={edgeCase.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {edgeCase.case_name}
                    </h3>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Scenario:</h4>
                      <p className="text-gray-600">{edgeCase.scenario}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Handling Strategy:
                      </h4>
                      <p className="text-gray-600">{edgeCase.handling_strategy}</p>
                    </div>

                    <button
                      onClick={() => setSelectedCase(edgeCase)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                    >
                      View Example Conversation
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Example Conversation: {selectedCase.case_name}
                </h3>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  {selectedCase.example_conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-100 ml-8'
                          : 'bg-gray-100 mr-8'
                      }`}
                    >
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                        {message.role === 'user' ? '👤 Customer' : '🤖 Assistant'}
                      </p>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {edgeCases.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No edge cases documented yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
