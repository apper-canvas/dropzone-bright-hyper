import { toast } from 'react-toastify';

export const uploadService = {
  async createUpload(uploadData) {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Prepare data with only updateable fields from upload_c table
      const params = {
        records: [{
          Name: uploadData.name,
          Tags: uploadData.tags || '',
          file_id_c: uploadData.file_id_c,
          size_c: uploadData.size_c,
          type_c: uploadData.type_c,
          file_type_c: uploadData.file_type_c,
          status_c: uploadData.status_c,
          progress_c: uploadData.progress_c,
          uploaded_at_c: uploadData.uploaded_at_c,
          url_c: uploadData.url_c,
          preview_c: uploadData.preview_c
        }]
      };
      
      const response = await apperClient.createRecord('upload_c', params);
      
      // Handle response
      if (!response.success) {
        console.error('Upload service error:', response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return {
            ...result.data,
            // Map database fields back to expected format for UI compatibility
            id: result.data.Id,
            name: result.data.Name,
            size: result.data.size_c,
            type: result.data.type_c,
            fileType: result.data.file_type_c,
            status: result.data.status_c,
            progress: result.data.progress_c,
            uploadedAt: result.data.uploaded_at_c,
            url: result.data.url_c,
            preview: result.data.preview_c
          };
        } else {
          console.error('Upload creation failed:', result.message);
          toast.error(result.message);
          throw new Error(result.message);
        }
      }
      
      throw new Error('No response data received');
    } catch (error) {
      console.error('Error creating upload record:', error);
      if (!error.message?.includes('Upload service error')) {
        toast.error('Failed to save upload record');
      }
      throw error;
    }
  }
};