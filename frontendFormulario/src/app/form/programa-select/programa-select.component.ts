import { Component, HostListener, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


type Opcion = { value: string; text: string };
type Grupo = { label: string; options: Opcion[] };

@Component({
  selector: 'programa-select',
  standalone: true,
  imports: [CommonModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProgramaSelectComponent),
    multi: true
  }],
  templateUrl: './programa-select.component.html',
  styleUrls: ['./programa-select.component.css']
})
export class ProgramaSelectComponent implements ControlValueAccessor {
  open = signal(false);
  value = signal<string | null>(null);
  disabled = signal(false);

  groups: Grupo[] = [
    {
      label: 'Licenciaturas',
      options: [
        { value: 'lic_pedagogia', text: 'Licenciatura en Pedagogía' },
        { value: 'lic_admin_empresas', text: 'Licenciatura en Administración de Empresas' },
        { value: 'lic_ingenieria_industrial', text: 'Licenciatura en Ingeniería Industrial' },
      ]
    },
    {
      label: 'Maestrías',
      options: [
        { value: 'ma_competencias_docentes_td', text: 'Maestría en Competencias Docentes para la Transformación Digital' },
        { value: 'ma_estadistica_ccss', text: 'Maestría en Estadística para Ciencias Sociales' },
        { value: 'ma_dir_innovacion_salud', text: 'Maestría en Dirección e Innovación en los Sistemas de Salud' },
        { value: 'ma_dir_logistica_cadena', text: 'Maestría en Dirección Logística y Cadena de Suministro' },
        { value: 'ma_ing_mantenimiento_industrial', text: 'Maestría en Ingeniería del Mantenimiento Industrial' },
        { value: 'ma_ia', text: 'Maestría en Inteligencia Artificial' },
        { value: 'ma_derecho', text: 'Maestría en Derecho' },
        { value: 'ma_admin_transformacion_digital', text: 'Maestría en Administración y Transformación Digital' },
        { value: 'ma_equidad_genero', text: 'Maestría en Equidad de Género' },
        { value: 'ma_seguridad_publica', text: 'Maestría en Seguridad Pública' },
        { value: 'ma_ventas_neuromkt_td', text: 'Maestría en Ventas, Neuromercadotecnia y Transformación Digital' },
        { value: 'ma_gestion_deportiva_alto_rendimiento', text: 'Maestría en Gestión Deportiva de Alto Rendimiento' },
      ]
    },
    {
      label: 'Doctorados',
      options: [
        { value: 'doc_dir_innovacion_digital_salud', text: 'Doctorado en Dirección e Innovación Digital en los Sistemas de Salud' },
        { value: 'doc_tecnologias_transformacion_digital', text: 'Doctorado en Tecnologías de la Transformación Digital' },
        { value: 'doc_transformacion_digital_industria', text: 'Doctorado en Transformación Digital para la Industria' },
        { value: 'doc_competencias_docentes_td', text: 'Doctorado en Competencias Docentes para la Transformación Digital' },
        { value: 'doc_derecho', text: 'Doctorado en Derecho' },
        { value: 'doc_admin_liderazgo_enfermeria', text: 'Doctorado en Administración y Liderazgo de Enfermería' },
      ]
    },
    {
      label: 'Especialidades',
      options: [
        { value: 'esp_bioetica', text: 'Especialidad en Bioética' },
        { value: 'esp_dir_estrategica_salud', text: 'Especialidad en Dirección Estratégica en los Sistemas de Salud' },
      ]
    },
    {
      label: 'Diplomados',
      options: [
        { value: 'dip_calidad', text: 'Diplomado en Calidad' },
        { value: 'dip_direccion_estrategica', text: 'Diplomado en Dirección Estratégica' },
      ]
    },
  ];

  // CVA
  private onChange: (val: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: string | null): void {
    this.value.set(val || null);
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }

  toggle() { if (!this.disabled()) this.open.set(!this.open()); }
  close() { this.open.set(false); }

  select(opt: Opcion) {
    this.value.set(opt.value);
    this.onChange(opt.value);
    this.onTouched();
    this.close();
  }

  labelFor(val: string | null) {
    for (const g of this.groups) {
      const f = g.options.find(o => o.value === val);
      if (f) return f.text;
    }
    return null;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.programa-select')) this.close();
  }
}
