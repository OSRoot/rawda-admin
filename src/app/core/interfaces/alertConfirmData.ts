export interface AlertData{
    data: {
        values: Record<number, string>; 
      };
    role: 'confirm' | 'cancel' | 'backdrop'; 
}