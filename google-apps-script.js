/**
 * Google Apps Script para recibir datos del formulario RSVP y guardarlos en Google Sheets
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. CREAR LA HOJA DE CÁLCULO:
 *    - Ve a https://sheets.google.com
 *    - Crea una nueva hoja de Google Sheets
 *    - En la primera fila, añade estas columnas exactamente:
 *      Nombre | Email | Pareja | Asistencia | Fecha
 *    - Copia el ID de la hoja (está en la URL entre /d/ y /edit)
 *      Ejemplo: docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
 * 
 * 2. CONFIGURAR EL SCRIPT:
 *    - Ve a https://script.google.com
 *    - Crea un nuevo proyecto (botón "Nuevo proyecto")
 *    - Borra el código por defecto y pega este código completo
 *    - En la línea 37, reemplaza 'TU_SHEET_ID_AQUI' con el ID que copiaste
 *    - Guarda el proyecto (Ctrl+S o Cmd+S) y ponle un nombre
 * 
 * 3. DESPLEGAR COMO APLICACIÓN WEB:
 *    - Haz clic en "Desplegar" (arriba a la derecha) > "Nueva implementación"
 *    - Haz clic en el icono de engranaje ⚙️ junto a "Selecciona tipo"
 *    - Selecciona "Aplicación web"
 *    - Configuración:
 *      * Descripción: "RSVP Web App" (opcional)
 *      * Ejecutar como: "Yo (tu email)"
 *      * Quién tiene acceso: "Cualquier persona"
 *    - Haz clic en "Implementar"
 *    - Autoriza los permisos cuando se te pida
 *    - Copia la URL de la aplicación web que aparece
 * 
 * 4. USAR LA URL:
 *    - Usa esa URL como NEXT_PUBLIC_GOOGLE_SCRIPT_URL en tu proyecto
 *    - La URL debe verse así: https://script.google.com/macros/s/XXXXX/exec
 */

function doPost(e) {
  try {
    // ⚠️ IMPORTANTE: Reemplaza 'TU_SHEET_ID_AQUI' con el ID real de tu hoja
    const SHEET_ID = '1DUNXtMr_AfXVAlZJ32qcjpzEjc1CfQqSrhB8Bvk0Bho';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Verificar que tenemos datos
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No se recibieron datos en la petición');
    }
    
    // Parsear los datos recibidos del formulario
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      Logger.log('Error al parsear JSON: ' + parseError.toString());
      throw new Error('Error al procesar los datos recibidos');
    }
    
    // Validar que los datos esenciales estén presentes
    if (!data.nombre || !data.email) {
      throw new Error('Faltan datos obligatorios: nombre o email');
    }
    
    // Preparar los datos para añadir a la hoja
    const row = [
      data.nombre || '',
      data.email || '',
      data.pareja || 'No especificado',
      data.asistencia === 'yes' ? 'Sí' : 'No',
      new Date().toLocaleString('es-ES', { 
        timeZone: 'Europe/Madrid',
        dateStyle: 'short',
        timeStyle: 'short'
      })
    ];
    
    // Añadir la fila a la hoja
    sheet.appendRow(row);
    
    // Log para debugging
    Logger.log('Datos guardados correctamente: ' + JSON.stringify(row));
    
    // Respuesta de éxito
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Datos guardados correctamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log del error para debugging
    Logger.log('Error en doPost: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    
    // Respuesta de error
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función de prueba para verificar que la aplicación web está activa
 * Accede a la URL de tu aplicación desde el navegador para probarla
 */
function doGet(e) {
  return ContentService
    .createTextOutput('✅ RSVP Web App está funcionando correctamente')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Función auxiliar para probar el script manualmente desde el editor
 * Ejecuta esta función desde el editor para verificar la conexión con la hoja
 * y probar que puede escribir datos
 */
function testConnection() {
  const SHEET_ID = '1DUNXtMr_AfXVAlZJ32qcjpzEjc1CfQqSrhB8Bvk0Bho';
  
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    Logger.log('✅ Conexión exitosa con la hoja: ' + sheet.getName());
    Logger.log('📊 Número de filas con datos: ' + sheet.getLastRow());
    
    // Probar escribir una fila de prueba
    const testRow = [
      'Prueba',
      'prueba@test.com',
      'Test',
      'Sí',
      new Date().toLocaleString('es-ES', { 
        timeZone: 'Europe/Madrid',
        dateStyle: 'short',
        timeStyle: 'short'
      })
    ];
    
    sheet.appendRow(testRow);
    Logger.log('✅ Fila de prueba añadida correctamente');
    Logger.log('📝 Datos: ' + JSON.stringify(testRow));
    
    return true;
  } catch (error) {
    Logger.log('❌ Error de conexión: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    return false;
  }
}
