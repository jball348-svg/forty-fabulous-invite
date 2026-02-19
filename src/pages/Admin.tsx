import { useState, useEffect } from "react";
import { Users, CheckCircle, XCircle, RefreshCw, Trash2 } from "lucide-react";
import { apiService } from "../lib/apiService";

interface RSVPResponse {
  name: string;
  attending: "yes" | "no";
  submittedAt: string;
}

const Admin = () => {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      console.log('Admin: Fetching responses...');
      const data = await apiService.getResponses();
      console.log('Admin: Received data:', data);
      setResponses(data.responses);
      setError(null);
    } catch (err) {
      console.error('Admin: Error fetching responses:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!window.confirm(`Are you sure you want to delete the RSVP for ${responses[index].name}?`)) {
      return;
    }

    try {
      setDeletingIndex(index);
      console.log('Admin: Deleting RSVP at index:', index);
      const result = await apiService.deleteRSVP(index);
      console.log('Admin: Delete result:', result);
      
      // Refresh the list
      await fetchResponses();
    } catch (err) {
      console.error('Admin: Error deleting RSVP:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete RSVP');
    } finally {
      setDeletingIndex(null);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const attendingCount = responses.filter(r => r.attending === 'yes').length;
  const notAttendingCount = responses.filter(r => r.attending === 'no').length;

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
            RSVP Admin
          </h1>
          <p className="font-body text-muted-foreground">
            View and manage RSVP responses
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-elegant p-6 text-center">
            <Users className="w-8 h-8 text-wine mx-auto mb-2" />
            <div className="font-display text-2xl font-medium">{responses.length}</div>
            <div className="font-body text-sm text-muted-foreground">Total Responses</div>
          </div>
          <div className="card-elegant p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-display text-2xl font-medium">{attendingCount}</div>
            <div className="font-body text-sm text-muted-foreground">Attending</div>
          </div>
          <div className="card-elegant p-6 text-center">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="font-display text-2xl font-medium">{notAttendingCount}</div>
            <div className="font-body text-sm text-muted-foreground">Not Attending</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-medium">Responses</h2>
          <button
            onClick={fetchResponses}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-wine text-cream rounded hover:bg-wine-light disabled:opacity-60 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="card-elegant p-6 text-center border border-red-200">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="card-elegant p-12 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-wine border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="font-body text-muted-foreground">Loading responses...</p>
          </div>
        )}

        {/* Responses List */}
        {!loading && !error && (
          <div className="card-elegant p-6">
            {responses.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-body text-muted-foreground">No RSVP responses yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {responses
                  .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                  .map((response, index) => {
                    // Find the actual index in the unsorted array for deletion
                    const actualIndex = responses.findIndex(r => r === response);
                    return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center">
                          <span className="font-display text-wine font-medium">
                            {response.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-body font-medium">{response.name}</h3>
                          <p className="font-body text-sm text-muted-foreground">
                            {new Date(response.submittedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {response.attending === 'yes' ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-body font-medium">Attending</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600">
                            <XCircle className="w-5 h-5" />
                            <span className="font-body font-medium">Not Attending</span>
                          </div>
                        )}
                        <button
                          onClick={() => handleDelete(actualIndex)}
                          disabled={deletingIndex === actualIndex}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete RSVP"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )})}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
